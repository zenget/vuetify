// Pathify
import { make } from 'vuex-pathify'

const state = {
  affiliates: require('@/data/ads/affiliates'),
  community: require('@/data/ads/community'),
  products: require('@/data/ads/products'),
  registered: [],
  themes: require('@/data/ads/themes.json'),
}

const mutations = make.mutations(state)

const actions = {
  isRegistered: (store, payload) => {
    return Promise.resolve(store.state.registered.includes(payload))
  },
  register: async ({ commit, state }, payload) => {
    const { registered } = state

    registered.push(payload)

    commit('SET_REGISTERED', registered)
  },
  unregister: async ({ state, commit }, payload) => {
    commit('SET_REGISTERED', state.registered.filter(r => r !== payload))
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
