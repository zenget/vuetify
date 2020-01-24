<template>
  <v-select
    v-model="model"
    :items="items"
    v-bind="attrs"
  />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      model: 'Foo',
    }),
  }
</script>
