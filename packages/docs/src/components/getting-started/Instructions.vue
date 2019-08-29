<template>
  <div>
    <v-tabs v-model="current" grow>
      <v-tab v-for="type in types" :key="type">{{ type }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="current">
      <v-tab-item
        v-for="type in types"
        :key="type"
        lazy
      >
        <div class="pa-5">
            <component
              v-for="(child, i) in data[type]"
              :is="getComponent(child.type)"
              :key="i"
              :value="child"
            />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getComponent } from '@/util/helpers'
import { types, data } from '@/data/pages/getting-started/Instructions.json'

export default {
  data: () => ({
    data,
    types,
    current: 0,
  }),
  methods: {
    getComponent,
  }
}
</script>

<style>

</style>
