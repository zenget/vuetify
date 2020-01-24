<template>
  <v-progress-circular v-bind="attrs" :value="100" />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
