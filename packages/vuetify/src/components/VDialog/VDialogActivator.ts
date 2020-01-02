import VDialog, { activator } from './VDialog'

import Activatable from '../../mixins/activatable'
import BindsAttrs from '../../mixins/binds-attrs'

import mixins from '../../util/mixins'

export default mixins(
  Activatable,
  BindsAttrs,
  /* @vue/component */
).extend({
  name: 'VDialogActivator',

  provide (): object {
    return {
      [activator]: this,
    }
  },

  data: () => ({
    instance: null as InstanceType<typeof VDialog> | null,
  }),

  watch: {
    isActive (val: boolean) {
      if (val && !this.instance) {
        this.createContent()
      }
      if (this.instance) {
        this.instance.isActive = val
      }
    },
  },

  methods: {
    createContent () {
      const instance = this.instance = new VDialog({
        parent: this,
        propsData: this.attrs$,
      })
      ;(instance as any).$scopedSlots = this.$scopedSlots
      instance.$on('input', (val: boolean) => {
        this.isActive = val
      })
      for (const listener in this.listeners$) {
        instance.$on(listener, (val: any) => this.$emit(listener, val))
      }

      instance.$mount()

      const parent = document.querySelector('[data-app]')

      parent && parent.insertBefore(instance.$el, parent.firstChild)
    },
  },

  render (h) {
    return this.genActivator()
  },
})
