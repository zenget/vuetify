// Extensions
import { Service } from '../service'

// Utilities
import * as easingPatterns from './easing-patterns'
import {
  getContainer,
  getOffset,
  waitForReadystate,
} from './util'

// Types
import Vue from 'vue'
import { GoToOptions, VuetifyGoToTarget } from 'vuetify/types/services/goto'

import { VuetifyServiceContract } from 'vuetify/types/services'

export function scrollBehavior (to, from, savedPosition) {
  return waitForReadystate()
    .then(() => {
      const options = {}
      let scrollTo = 0

      if (to.hash) {
        scrollTo = to.hash
      } else if (savedPosition) {
        scrollTo = savedPosition.y
      }

      return new Promise(resolve => {
        setTimeout(() => {
          if (typeof window === 'undefined') {
            return resolve()
          }

          window.requestAnimationFrame(() => {
            try {
              goTo(scrollTo, options)
            } catch (err) {
              console.log(err)
            }

            resolve()
          })
        }, 200)
      })
    })
}

export default function goTo (
  _target: VuetifyGoToTarget,
  _settings: Partial<GoToOptions> = {}
): Promise<number> {
  const options = goTo.options
  const container = getContainer(options.container)

  /* istanbul ignore else */
  if (options.appOffset && goTo.framework.application) {
    const isDrawer = container.classList.contains('v-navigation-drawer')
    const isClipped = container.classList.contains('v-navigation-drawer--clipped')
    const { bar, top } = goTo.framework.application as any

    options.offset += bar
    /* istanbul ignore else */
    if (!isDrawer || isClipped) options.offset += top
  }

  const startTime = performance.now()

  let targetLocation: number
  if (typeof _target === 'number') {
    targetLocation = getOffset(_target) - options.offset!
  } else {
    targetLocation = getOffset(_target) - getOffset(container) - options.offset!
  }

  const startLocation = container.scrollTop
  if (targetLocation === startLocation) return Promise.resolve(targetLocation)

  const ease = typeof options.easing === 'function'
    ? options.easing
    : easingPatterns[options.easing!]
  /* istanbul ignore else */
  if (!ease) throw new TypeError(`Easing function "${options.easing}" not found.`)

  // Cannot be tested properly in jsdom
  // tslint:disable-next-line:promise-must-complete
  /* istanbul ignore next */
  return new Promise(resolve => requestAnimationFrame(function step (currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = Math.abs(options.duration ? Math.min(timeElapsed / options.duration, 1) : 1)

    container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress))

    const clientHeight = container === document.body ? document.documentElement.clientHeight : container.clientHeight
    if (progress === 1 || clientHeight + container.scrollTop === container.scrollHeight) {
      return resolve(targetLocation)
    }

    requestAnimationFrame(step)
  }))
}

goTo.framework = {} as Record<string, VuetifyServiceContract>
goTo.options = {} as GoToOptions
goTo.init = (root: Vue) => {
  const { router } = root.$options as any

  console.log('router', goTo.options)

  if (!router || !goTo.options.scrollBehavior) return

  console.log('made it')

  router.options.scrollBehavior = scrollBehavior
}

export class Goto extends Service {
  public static property = 'goTo'

  public options: GoToOptions = {
    appOffset: true,
    container: typeof document !== 'undefined' ? (
      (document.scrollingElement as HTMLElement | null) ||
      document.body ||
      document.documentElement
    ) : undefined,
    duration: 500,
    easing: 'easeInOutCubic',
    offset: 0,
    scrollBehavior: false,
  }

  constructor (options: Partial<GoToOptions> = {}) {
    super()

    console.log('init options', options)

    goTo.options = Object.assign({}, this.options, options)

    return goTo
  }
}
