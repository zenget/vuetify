// Components
import VOverlay from '../../components/VOverlay'

// Utilities
import { addOnceEventListener } from '../../util/helpers'

// Types
import Vue from 'vue'

interface Toggleable extends Vue {
  isActive?: boolean
}

interface Stackable extends Vue {
  activeZIndex: number
}

interface options {
  absolute?: boolean
  $refs: {
    dialog?: HTMLElement
    content?: HTMLElement
  }
}

/* @vue/component */
export default Vue.extend<Vue & Toggleable & Stackable & options>().extend({
  name: 'overlayable',

  props: {
    hideOverlay: Boolean,
    overlayColor: String,
    overlayOpacity: [Number, String],
  },

  data () {
    return {
      overlay: null as InstanceType<typeof VOverlay> | null,
      overlayZIndex: null
    }
  },

  watch: {
    hideOverlay (value) {
      if (!this.isActive) return

      if (value) this.removeOverlay()
      else this.genOverlay()
    },
  },

  beforeDestroy () {
    this.removeOverlay()
  },

  methods: {
    createOverlay () {
      const overlay = new VOverlay({
        propsData: {
          absolute: this.absolute,
          value: false,
          color: this.overlayColor,
          opacity: this.overlayOpacity,
          zIndex: this.overlayZIndex,
        },
      })

      overlay.$mount()

      const parent = this.absolute
        ? this.$el.parentNode
        : document.querySelector('[data-app]')

      parent && parent.insertBefore(overlay.$el, parent.firstChild)

      this.overlay = overlay
    },
    genOverlay () {
      if (this.hideOverlay) return

      if (!this.overlay) this.createOverlay()

      requestAnimationFrame(() => {
        if (!this.overlay) return

        if (this.activeZIndex !== undefined) {
          this.overlay.zIndex = String(this.activeZIndex - 1)
        } else if (this.$el) {
          this.overlay.zIndex = getZIndex(this.$el)
        }

        this.overlay.value = true
      })

      return true
    },
    removeOverlay () {
      if (this.overlay) {
        addOnceEventListener(this.overlay.$el, 'transitionend', () => {
          if (
            !this.overlay ||
            !this.overlay.$el ||
            !this.overlay.$el.parentNode ||
            this.overlay.value
          ) return

          this.overlay.$el.parentNode.removeChild(this.overlay.$el)
          this.overlay.$destroy()
          this.overlay = null
        })

        this.overlay.value = false
      }
    }
  }
})
