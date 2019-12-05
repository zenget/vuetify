import Vue from 'vue'
import VDialog from './VDialog'

import Activatable from '../../mixins/activatable'
import BindsAttrs from '../../mixins/binds-attrs'

import mixins from '../../util/mixins'

export default mixins(
  Activatable,
  BindsAttrs,
  /* @vue/component */
).extend({
  data: () => ({
    instance: null as InstanceType<typeof VDialog> | null,
  }),

  watch: {
    isActive (val: boolean) {
      if (val && !this.instance) {
        this.createContent()
      }
      if (this.instance) {
        this.instance.$refs.dialog.isActive = val
      }
    },
  },

  methods: {
    createContent () {
      const vm = this
      const instance = this.instance = new Vue({
        abstract: true,
        parent: this,
        render (h) {
          return h(VDialog, {
            attrs: vm.attrs$,
            scopedSlots: vm.$scopedSlots,
            ref: 'dialog',
          })
        },
      })

      instance.$mount()

      const parent = document.querySelector('[data-app]')

      parent && parent.insertBefore(instance.$el, parent.firstChild)
    },
  },

  render (h) {
    return this.genActivator()
  },
})
