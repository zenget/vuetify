<template>
  <v-content class="pa-1">
    <v-layout row wrap>
      <v-flex sm6 xs12>
        <v-layout column>
          <v-flex px-5 pt-5 pb-0>
            <v-flex
              v-for=" (color, tkey) in themeSelects"
              :key="tkey"
              pa-0
            >
              <v-text-field
                v-model="$vuetify.theme.currentTheme[tkey]"
                solo
                :color="$vuetify.theme[tkey]"
                :label="tkey"
                class="colorField"
              >
                <v-icon
                  slot="prepend-inner"
                  :color="$vuetify.theme.currentTheme[tkey]"
                >
                  mdi-format-color-fill
                </v-icon>
                <v-menu
                  slot="append-outer"
                  transition="slide-y-transition"
                  bottom
                >
                  <v-card
                    slot="activator"
                    :color="$vuetify.theme.currentTheme[tkey]"
                    class="pa-2 d-flex"
                    tile
                    height="48"
                    max-width="48"
                    width="48"
                  />
                  <v-item-group
                    v-model="themeSelects[tkey]"
                    class="hiddenScroll"
                  >
                    <v-item
                      v-for="palette in palettes"
                      :key="palette"
                    >
                      <v-hover slot-scope="{ active, toggle }">
                        <v-card
                          slot-scope="{ hover }"
                          :color="palette"
                          :style="getStyle(active, hover)"
                          :value="palette"
                          :class="`elevation-${active || hover ? '12' : '0'}`"
                          class="pa-2 d-flex"
                          tile
                          height="48"
                          max-width="48"
                          width="48"
                          @click.native="toggle(); setThemeColor(tkey);"
                        />
                      </v-hover>
                    </v-item>
                  </v-item-group>
                </v-menu>
              </v-text-field>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex sm6 xs12 pa-0>
        <v-layout>
          <v-flex pa-5>
            <v-card
              class="elevation-16 mx-auto"
              color="secondary"
              dark
              height="500"
              max-width="500"
              tile
            >
              <v-system-bar
                class="primary darken-2"
                status
              />
              <v-toolbar
                color="primary"
                flat
                extended
              >
                <v-btn icon>
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <v-toolbar-title
                  slot="extension"
                  class="white--text"
                >
                  Title
                </v-toolbar-title>
                <v-btn
                  color="accent"
                  absolute
                  bottom
                  fab
                  right
                >
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-toolbar>
              <v-layout row wrap class="pt-5">
                <v-flex xs6 px-3>
                  <v-alert type="success" dense />
                </v-flex>
                <v-flex xs6 px-3>
                  <v-alert type="info" dense />
                </v-flex>
                <v-flex xs6 px-3>
                  <v-alert type="warning" dense />
                </v-flex>
                <v-flex xs6 px-3>
                  <v-alert type="error" dense />
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  // Utilities
  import colors from 'vuetify/es5/util/colors'
  import { kebabCase, camelCase } from 'lodash'

  export default {
    components: {
      // ExportModal: () => import('./ExportModal')
    },

    data: () => ({
      colors,
      selections: '',
      exportModal: false,
      themeSelects: {
        primary: '',
        secondary: '',
        accent: '',
        success: '',
        info: '',
        warning: '',
        error: ''
      }
    }),

    computed: {
      palettes () {
        const keys = Object.keys(this.colors)
        return keys.map(kebabCase).slice(0, keys.length - 2)
      }
    },

    methods: {
      getStyle (active, hover) {
        return {
          transform: active || hover ? 'scale(.9, .85)' : 'none'
        }
      },
      setThemeColor (themeProp) {
        const selected = camelCase(this.palettes[this.themeSelects[themeProp]])
        const theme = (this.$vuetify.theme.dark) ? 'dark' : 'light'
        console.log(themeProp, this.themeSelects[themeProp], selected)
        this.$vuetify.theme.setTheme(theme, { [themeProp]: this.colors[selected].base })
      }
    }
  }
</script>
<style>
  .hiddenScroll {
    max-height: 300px;
    overflow-y: scroll;
    background: #fff;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
  }
  .hiddenScroll::-webkit-scrollbar { /* WebKit */
      width: 0px;
  }
  .colorField > .v-input__append-outer {
    margin: 0px !important;
  }
</style>
