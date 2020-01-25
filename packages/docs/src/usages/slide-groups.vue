<template>
  <v-slide-group
    v-model="model"
    v-bind="attrs"
  >
    <v-slide-item
      v-for="n in 15"
      :key="n"
      v-slot:default="{ active, toggle }"
    >
      <v-card
        :color="active ? 'primary' : 'grey lighten-1'"
        class="ma-4"
        height="200"
        width="100"
        @click="toggle"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-scale-transition>
            <v-icon
              v-if="active"
              color="white"
              size="48"
              v-text="'mdi-close-circle-outline'"
            />
          </v-scale-transition>
        </v-row>
      </v-card>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      model: null,
    }),
  }
</script>
