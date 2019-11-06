<template>
  <v-img
    alt="Application Hero Image"
    class="white--text text-center"
    lazy-src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    v-bind="imgAttrs"
  >
    <v-overlay
      :color="item.overlay || 'transparent'"
      absolute
      class="text-center text-capitalize"
      opacity="1"
    >
      <h2
        class="mb-3 font-italic font-weight-black"
        :class="[$vuetify.breakpoint.mdAndUp ? 'display-4' : 'display-1'],"
        v-text="heading"
      />

      <div
        class="mb-2 text-uppercase headline"
        :class="[$vuetify.breakpoint.mdAndUp ? 'display-4' : 'title']"
        v-text="item.subheading"
      />

      <div
        class="font-weight-bold"
        :class="[$vuetify.breakpoint.mdAndUp ? 'display-4' : 'display-1']"
        v-text="item.tag"
      />

      <slot />
    </v-overlay>
  </v-img>
</template>

<script>
  export default {
    name: 'BaseHero',

    props: {
      contain: {
        type: Boolean,
        default: false,
      },
      gradient: {
        type: String,
        default: 'to bottom, #1867c0, #5CBBF6',
      },
      value: {
        type: String,
        default: undefined,
      },
      maxHeight: {
        type: [Number, String],
        default: undefined,
      },
      minHeight: {
        type: [Number, String],
        default: undefined,
      },
    },

    computed: {
      name: sync('route/name'),
      imgAttrs () {
        return {
          aspectRatio: 16 / 9,
          gradient: this.gradient,
          minHeight: this.minHeight || '15vh',
          maxHeight: this.maxHeight || (this.$vuetify.breakpoint.smAndDown ? '60vh' : undefined),
          src: 'https://cdn.vuetifyjs.com/images/backgrounds/bg.jpg',
        }
      },
    },
  }
</script>
