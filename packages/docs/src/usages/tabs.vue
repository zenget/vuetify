<template>
  <div>
    <v-tabs
      background-color="deep-purple accent-4"
      dark
      class="elevation-2"
      v-bind="attrs"
    >
      <v-tabs-slider />

      <v-tab
        v-for="i in tabs"
        :key="i"
        :href="`#tab-${i}`"
      >
        Tab {{ i }}
      </v-tab>

      <v-tab-item
        v-for="i in tabs"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card
          flat
          tile
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data () {
      return {
        tabs: 3,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>
