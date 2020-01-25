<template>
  <div>
    <v-btn
      block
      color="primary"
      dark
      @click="snackbar = true"
    >
      Show Snackbar
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      v-bind="attrs"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data () {
      return {
        snackbar: false,
        text: 'Hello, I\'m a snackbar',
        timeout: 6000,
      }
    },
  }
</script>
