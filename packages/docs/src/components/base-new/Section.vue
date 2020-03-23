<template>
  <section
    v-bind="$attrs"
    :style="styles"
    v-on="$listeners"
  >
    <v-responsive
      :max-width="1280 + 24"
      class="mx-auto"
    >
      <slot />
    </v-responsive>
  </section>
</template>

<script>
  // Mixins
  // Components
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'BaseNewSection',

    mixins: [Themeable],

    props: {
      padding: {
        type: [Number, String],
        default: 96,
      },
    },

    computed: {
      styles () {
        const padding = this.$vuetify.breakpoint.mdAndUp
          ? this.padding
          : this.padding / 2

        return {
          padding: `${padding}px 0`,
        }
      },
    },
  }
</script>
