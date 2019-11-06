<template>
  <v-container id="about-vuetify-ads" tag="section">
    <company-hero />
  </v-container>
</template>

<script>
  export default {
    name: 'Company',

    components: {
      CompanyHero: () => import('./Hero')
    }
  }
</script>
