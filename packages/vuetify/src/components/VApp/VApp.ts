// Styles
import './VApp.sass'

import {
  defineComponent,
  computed,
  h,
  ref,
  provide,
  mergeProps,
} from 'vue'

export default defineComponent({
  name: 'VApp',

  setup (props, { attrs, slots }) {
    const classes = computed(() => ({
      'v-application': true,
    }))

    const layout = ref({
      top: 0,
    })

    provide('layout', layout)

    return () => (
      h('div', mergeProps(attrs, {
        class: classes.value,
        'data-app': true,
      }), h('div', {
        class: 'v-application__wrap',
      }, slots.default()))
    )
  },
})
