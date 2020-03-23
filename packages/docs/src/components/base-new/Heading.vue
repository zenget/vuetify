<template>
  <component
    :is="tag"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
  export default {
    name: 'BaseNewHeading',

    props: {
      level: {
        type: [Number, String],
        required: true,
      },
    },

    data: () => ({
      headingMap: {
        1: ['display-1', 'display-3', 4, 'light'],
        2: ['title', 'display-1', 6, 'medium'],
        3: ['subtitle-1', 'headline', 6, 'medium'],
        4: ['subtitle-1', 'title', 4, 'bold'],
        5: ['subtitle-2', 'subtitle-1', 2, 'regular'],
        6: ['overline', 'overline', 2, 'black'],
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
      heading () {
        return this.headingMap[Number(this.level)]
      },
      size () {
        const [mobile, desktop] = this.heading

        return this.$vuetify.breakpoint.smAndUp
          ? desktop
          : mobile
      },
      spacing () {
        return this.heading[2]
      },
      tag () {
        return `h${this.level}`
      },
      weight () {
        return this.heading[3]
      },
    },
  }
</script>
