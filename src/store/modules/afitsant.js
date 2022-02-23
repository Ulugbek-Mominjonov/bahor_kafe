import EventService from '@/services/EventServices.js'

export const namespaced = true

export const state = {
  allAfitsant: [],
  afitsant: []
}
export const mutations = {
  SET_AFITSANTS(state, payload) {
    state.allAfitsant = payload
  },
  SET_AFITSANT(state, payload) {
    state.afitsant = payload
  }
}
export const actions = {
  async afitsants ({commit}) {
    await EventService.getAllAfitsants()
      .then(res => {
        commit('SET_AFITSANTS', res.data)
      })
  },
  async filterAfitsants({commit}, params) {
    await EventService.getFilterAfitsants(params.last, params.current)
      .then(res => {
        commit('SET_AFITSANTS', res.data)
      })
  },
  async afitsant ({commit}, id) {
    await EventService.getAfitsant(id)
      .then(res => {
        commit('SET_AFITSANT', res.data)
      })
  },

}
export const getters = {
}