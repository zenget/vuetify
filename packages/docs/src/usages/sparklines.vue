<template>
  <v-container fluid>
    <v-sparkline
      :value="value"
      :gradient="gradient"
      :line-width="lineWidth"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :type="type"
      :label-size="labelSize"
      :labels="labels"
      :show-labels="false"
      v-bind="attrs"
    />
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      lineWidth: 2,
      labelSize: 7,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: ['#f72047', '#ffd200', '#1feaea'],
      value: [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0],
      labels: [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      type: 'trend',
    }),
  }
</script>
