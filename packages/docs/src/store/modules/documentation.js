// Utilities
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { make } from 'vuex-pathify'

// Utilities
import {
  addContentAd,
  addFooterAd,
  addHeadingAndAd,
} from '../../util/ads'
import {
  getHeadings,
  getNamespace,
} from '../../util/helpers'

const state = {
  deprecatedIn: require('@/data/deprecated.json'),
  links: require('@/data/drawerItems.json'),
  newIn: require('@/data/new.json'),
  namespace: null,
  page: null,
  structure: null,
  toc: [],
}

const mutations = make.mutations(state)
const actions = {}
const getters = {
  breadcrumbs (state, getters, rootState) {
    if (!rootState.route) return []

    const namespace = rootState.route.params.namespace
    const lang = rootState.route.params.lang
    const path = rootState.route.path
    const text = getNamespace(namespace)

    return [
      {
        text: upperFirst(namespace.split('-').join(' ')),
        to: text ? `/${lang}/${text}` : undefined,
        disabled: !text,
      },
      {
        text: upperFirst(rootState.route.params.page.split('-').join(' ')),
        to: path,
        disabled: true,
      },
    ]
  },
  headings (state, getters) {
    return getHeadings(getters.structure)
  },
  namespace (state, getters, rootState) {
    return !rootState.route
      ? undefined
      : upperFirst(camelCase(rootState.route.params.namespace))
  },
  page (state, getters, rootState) {
    return !rootState.route
      ? undefined
      : upperFirst(camelCase(rootState.route.params.page))
  },
  structure (state, getters, rootState) {
    const children = JSON.parse(JSON.stringify((state.structure || {}).children || []))

    if (!children.length) return children

    addHeadingAndAd(children)
    addContentAd(rootState.route.params.namespace, children)
    addFooterAd(children)

    return children
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
