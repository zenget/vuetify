<template>
  <v-row justify="center" align="center">
    <v-container fluid>
      <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px" class="mb-6">
        <v-system-bar
          color="orange"
          :height="30"
          v-bind="attrs"
        >
          <v-icon>mdi-gmail</v-icon>
          <span>10 unread emails</span>
          <v-spacer />
          <v-icon>mdi-wifi-strength-4</v-icon>
          <v-icon>mdi-signal-cellular-outline</v-icon>
          <v-icon>mdi-battery</v-icon>
          <span>12:30</span>
        </v-system-bar>
      </v-card>
    </v-container>

    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="height"
          class="mx-4"
          label="Height - px"
          max="30"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        />
      </v-col>
      <v-col cols="4">
        <v-switch v-model="lightsOut" label="Toggle lights-out" class="mx-4" />
      </v-col>
      <v-col cols="4">
        <v-switch v-model="window" label="Toggle window" class="mx-4" />
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
