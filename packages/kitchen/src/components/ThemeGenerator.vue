<template>
  <v-dialog
    v-model="themeDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    class="pa-0"
  >
    <v-btn
      slot="activator"
      icon
      title="Theme Generator"
    >
      <v-icon>mdi-format-paint</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          <span class="font-weight-black blue--text">VUETIFY</span>
          <span class="font-weight-light">THEME GENERATOR</span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          title="Import / Export"
          @click="importExport"
        >
          <v-icon>
            mdi-swap-vertical
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Change theme"
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>
            mdi-invert-colors
          </v-icon>
        </v-btn>
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

    methods: {
      importExport () {
        console.log('Import/Export')
      }
    }
  }
</script>
