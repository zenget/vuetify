// Contracts
import { VuetifyServiceContract } from 'vuetify/types/services/index'

// Types
import Vue from 'vue'
import { Framework } from 'vuetify'

export class Service implements VuetifyServiceContract {
  framework!: Framework

  init (root: Vue, ssrContext?: object) {}
}
