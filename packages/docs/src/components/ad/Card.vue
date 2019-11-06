<template>
  <v-card
    v-show="activeTemplate"
    class="mb-12"
    outlined
  >
    <v-list
      v-if="activeTemplate"
      class="py-0"
      color="transparent"
    >
      <v-list-item
        :href="`${activeTemplate.url}?ref=vuetifyjs.com${activeTemplate.query || ''}`"
        :title="activeTemplate.description"
        target="_blank"
        rel="noopener noreferrer"
        @click="$ga.event($route.path, 'click', 'theme-ad')"
      >
        <v-list-item-avatar
          size="56"
          tile
        >
          <v-img
            :alt="`Link to ${activeTemplate.title}`"
            :src="activeTemplate.src"
            style="border-radius: 4px 0 0 4px"
          />
        </v-list-item-avatar>

        <v-list-item-content class="align-self-center">
          <v-list-item-title v-text="activeTemplate.title" />

          <v-list-item-subtitle v-text="activeTemplate.description" />
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-open-in-new</v-icon>

          <router-link
            :to="{
              name: 'AboutVuetifyAds',
              params: { lang: $route.params.lang }
            }"
            class="caption text--secondary"
          >
            ads by Vuetify
          </router-link>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  import {
    random,
  } from '../../util/helpers'

  export default {
    name: 'AdCard',

    props: {
      dense: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: 'all',
      },
    },

    data: () => ({
      activeTemplate: undefined,
      affiliates: require('@/data/ads/affiliates'),
      community: require('@/data/ads/community'),
      products: require('@/data/ads/products'),
      themes: require('@/data/ads/themes.json'),
    }),

    computed: {
      all () {
        return {
          ...this.affiliates,
          ...this.community,
          ...this.products,
          ...this.themes,
        }
      },
      groups () {
        return {
          affiliates: this.affiliates,
          community: this.community,
          products: this.products,
          themes: this.themes,
        }
      },
    },

    mounted () {
      let ads

      if (Array.isArray(this.value)) {
        ads = this.value.reduce((acc, cur) => {
          const entries = this[cur] || {}

          return Object.assign({}, acc, entries)
        })
      } else if (this.value === 'all') {
        ads = this.all
      } else {
        ads = (this.groups[this.value] || {}) || {}
      }

      const keys = Object.keys(ads)

      if (!keys.length) return undefined

      const key = random(keys.length)
      const ad = keys[key]

      this.activeTemplate = ads[ad]
    },
  }
</script>
