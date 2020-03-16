import { VNodeDirective } from 'vue/types/vnode'
import { DirectiveOptions } from 'vue'
import { getContainer } from '../../services/goto/util'

interface ScrollVNodeDirective extends Omit<VNodeDirective, 'arg'> {
  arg?: string | Element
  value: EventListener | {
    handler: EventListener
    options?: boolean | AddEventListenerOptions
  } | EventListenerObject & { options?: boolean | AddEventListenerOptions }
}

function inserted (el: HTMLElement, binding: ScrollVNodeDirective) {
  const value = binding.value
  const options = (typeof value === 'object' && value.options) || { passive: true }
  const callback = typeof value === 'function' || 'handleEvent' in value ? value : value.handler
  const target = getContainer(binding.arg) || window

  target.addEventListener('scroll', callback, options)

  el._onScroll = {
    callback,
    options,
    target,
  }
}

function unbind (el: HTMLElement) {
  if (!el._onScroll) return

  const { callback, options, target } = el._onScroll

  target.removeEventListener('scroll', callback, options)
  delete el._onScroll
}

export const Scroll = {
  inserted,
  unbind,
} as DirectiveOptions

export default Scroll
