<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-input
        v-bind="attrs"
        :messages="['Messages']"
        :success-messages="attrs.success ? ['Done!'] : []"
        :error-messages="attrs.error ? ['Error', 'Another one', 'One more', 'All the errors'] : []"
        hint="I am hint"
        append-icon="close"
        prepend-icon="phone"
        @click:append="appendIconCallback"
        @click:prepend="prependIconCallback"
      >
        Default Slot
      </v-input>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    methods: {
      appendIconCallback () {
        alert('click:append')
      },
      prependIconCallback () {
        alert('click:prepend')
      },
    },
  }
</script>
