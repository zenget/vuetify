<template>
  <v-sheet
    :width="width"
    :height="height"
    :elevation="elevation"
    v-bind="attrs"
  />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      width: 100,
      height: 100,
      elevation: 4,
    }),
  }
</script>
