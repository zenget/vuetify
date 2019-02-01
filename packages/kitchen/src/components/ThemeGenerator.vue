<template>
  <v-dialog
    v-model="themeDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-btn
      slot="activator"
      icon
      title="Theme Generator"
    >
      <v-icon>mdi-format-paint</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar
        app
        clipped-right
      >
        <v-toolbar-title>
          <span class="font-weight-black blue--text">VUETIFY</span>
          <span class="font-weight-light">THEME GENERATOR</span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          title="Close theme generator"
          @click="themeDialog = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <theme-view />
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'ThemeGenerator',

    components: {
      ThemeView: () => import('./theme/View')
    },

    data: () => ({
      themeDialog: false
    }),

    computed: {},

    methods: {}
  }
</script>
