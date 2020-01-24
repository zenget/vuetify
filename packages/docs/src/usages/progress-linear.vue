<template>
  <v-progress-linear :value="100" v-bind="attrs" />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
