// Types
import Vue from 'vue'
import { Framework } from 'vuetify'

export interface VuetifyServiceContract {
  framework: Framework
  init: (root: Vue, ssrContext?: object) => void
}

export interface VuetifyService {
  property: string
  new (options?: any): VuetifyServiceContract
}
