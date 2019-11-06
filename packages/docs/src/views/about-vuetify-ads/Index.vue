<template>
  <v-container
    id="about-vuetify-ads"
    tag="section"
  >
    <base-heading># About Vuetify Ads</base-heading>

    <base-text>
      The Vuetify documentation utilizies [Carbon Ads](https://www.carbonads.net/about) for standard served ads. Carbon Ads is a whitelisted ad provider that only serves quality tech based advertisements.
    </base-text>

    <base-heading>### Frequently Asked Questions</base-heading>

    <base-markdown>
      Below is a collection of commonly asked questions. If your issue is not covered in the list, please reach out to [John Leider](mailto:john@vuetifyjs.com).
    </base-markdown>

    <base-heading>
      #### Q: When and where do you serve ads?
    </base-heading>

    <base-markdown>
      Each page within the documentation contains 2 ads. One after the page intro and one after the Up Next section. Ads are refreshed with each page load.
    </base-markdown>

    <base-heading>
      #### Q: What happens if I use an adblocker?
    </base-heading>

    <base-markdown>
      Carbon Ads is a whitelisted advertising platform that will still display on most ad blockers. If you choose to manully ignore the ad, you will receive a [Vuetify Ad](#what-are-vuetify-ads).
    </base-markdown>

    <base-heading>#### Q: What are Vuetify Ads?</base-heading>

    <base-markdown>
      Vuetify ads are brand specific links to places such as the community, our status page, themes, etc. Served ads are 100% random and pull from a pool of possible options.
    </base-markdown>

    <base-heading>#### Q: When are Vuetify Ads shown?</base-heading>

    <base-markdown>
      Vuetify ads are shown when a Carbon Ad fails to load.
    </base-markdown>

    <base-heading>
      #### Can I remove Vuetify Ads?
    </base-heading>

    <base-markdown>
      At this time there is no way to disable Vuetify Ads.
    </base-markdown>
  </v-container>
</template>

<script>
  export default {
    name: 'AboutVuetifyAds',

    data: () => ({

    }),
  }
</script>

<style lang="sass">
  //
</style>
