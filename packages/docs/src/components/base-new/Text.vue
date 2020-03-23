<template>
  <p
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </p>
</template>

<script>
  export default {
    name: 'BaseNewText',

    props: { heading: Boolean },

    data: () => ({
      textMap: {
        body: ['body-2', 'body-1', 2, 'regular'],
        heading: ['subtitle-1', 'title', 12, 'light'],
      },
    }),

    computed: {
      classes () {
        return [
          this.size,
          `mb-${this.spacing}`,
          `font-weight-${this.weight}`,
        ]
      },
      size () {
        const [mobile, desktop] = this.text

        return this.$vuetify.breakpoint.smAndUp
          ? desktop
          : mobile
      },
      text () {
        return this.textMap[this.heading ? 'heading' : 'body']
      },
      spacing () {
        return this.text[2]
      },
      weight () {
        return this.text[3]
      },
    },
  }
</script>
