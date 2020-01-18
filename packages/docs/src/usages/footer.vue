<template>
  <v-footer v-bind="attrs">
    Footer content
  </v-footer>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
