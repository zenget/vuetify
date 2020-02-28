<template>
  <v-text-field
    v-model="text"
    label="Label"
    :hint="hint"
    v-bind="attrs"
  />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data () {
      return {
        hint: 'hint',
        text: '',
      }
    },
  }
</script>
