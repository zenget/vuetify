<template>
  <v-rating v-model="rating" v-bind="attrs" />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      rating: 2,
    }),
  }
</script>
