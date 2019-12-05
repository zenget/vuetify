// Mixins
import Delayable from '../delayable'
import Toggleable from '../toggleable'

// Utilities
import mixins from '../../util/mixins'
import { getSlot, getSlotType } from '../../util/helpers'
import { consoleError, consoleWarn } from '../../util/console'

// Types
import { VNode, PropType } from 'vue'

const baseMixins = mixins(
  Delayable,
  Toggleable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'activatable',

  props: {
    activator: {
      default: null as unknown as PropType<string | HTMLElement | VNode | Element | null>,
      validator: (val: string | object) => {
        return ['string', 'object'].includes(typeof val)
      },
    },
    disabled: Boolean,
    openOnHover: Boolean,
  },

  data: () => ({
    // Do not use this directly, call getActivator() instead
    activatorElement: null as HTMLElement | null,
    activatorNode: null as VNode | null,
    events: ['click', 'mouseenter', 'mouseleave'],
    listeners: {} as Record<string, (e: MouseEvent & KeyboardEvent) => void>,
  }),

  watch: {
    activator: 'resetActivator',
    openOnHover: 'resetActivator',
  },

  mounted () {
    this.addActivatorEvents()
  },

  beforeDestroy () {
    this.removeActivatorEvents()
  },

  methods: {
    addActivatorEvents () {
      if (
        this.disabled ||
        !this.getActivator() ||
        getSlotType(this, 'activator', true) === 'scoped'
      ) return

      this.listeners = this.genActivatorListeners()
      const keys = Object.keys(this.listeners)

      for (const key of keys) {
        this.getActivator()!.addEventListener(key, this.listeners[key] as any)
      }
    },
    genActivator () {
      const node = getSlot(this, 'activator', Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes(),
      })) || []

      if (node.length > 1) {
        consoleWarn('The activator slot should only contain a single element', this)
      }

      this.activatorNode = node[0]

      return node[0]
    },
    genActivatorAttributes () {
      return {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive),
      }
    },
    genActivatorListeners () {
      if (this.disabled) return {}

      const listeners: Record<string, (e: MouseEvent & KeyboardEvent) => void> = {}

      if (this.openOnHover) {
        listeners.mouseenter = (e: MouseEvent) => {
          this.getActivator(e)
          this.runDelay('open')
        }
        listeners.mouseleave = (e: MouseEvent) => {
          this.getActivator(e)
          this.runDelay('close')
        }
      } else {
        listeners.click = (e: MouseEvent) => {
          const activator = this.getActivator(e)
          if (activator) activator.focus()

          this.isActive = !this.isActive
        }
      }

      return listeners
    },
    getActivator (e?: Event): HTMLElement | null {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement

      let activator = null

      if (this.activator) {
        if (typeof this.activator === 'string') {
          // Selector
          activator = document.querySelector(this.activator)
        } else if ((this.activator as any).$el) {
          // Component (ref)
          activator = (this.activator as any).$el
        } else {
          // HTMLElement | Element
          activator = this.activator
        }
      } else if (this.activatorNode && !e) {
        // Use the contents of the activator slot
        const vm = this.activatorNode.componentInstance
        if (
          vm &&
          vm.$options.mixins && //                         Activatable is indirectly used via Menuable
          vm.$options.mixins.some((m: any) => m.options && ['activatable', 'menuable'].includes(m.options.name))
        ) {
          // Activator is actually another activatible component, use its activator (#8846)
          activator = (vm as any).getActivator()
        } else {
          activator = this.activatorNode.elm as HTMLElement
        }
      } else if (e) {
        // Activated by a click event
        activator = (e.currentTarget || e.target) as HTMLElement
      }

      this.activatorElement = activator

      return this.activatorElement
    },
    getContentSlot () {
      return getSlot(this, 'default', this.getValueProxy(), true)
    },
    getValueProxy (): object {
      const self = this
      return {
        get value () {
          return self.isActive
        },
        set value (isActive: boolean) {
          self.isActive = isActive
        },
      }
    },
    removeActivatorEvents () {
      if (
        !this.activator ||
        !this.activatorElement
      ) return

      const keys = Object.keys(this.listeners)

      for (const key of keys) {
        (this.activatorElement as any).removeEventListener(key, this.listeners[key])
      }

      this.listeners = {}
    },
    resetActivator () {
      this.activatorElement = null
      this.getActivator()
      this.addActivatorEvents()
    },
  },
})
