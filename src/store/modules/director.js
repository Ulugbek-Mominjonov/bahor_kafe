import EventService from '@/services/EventServices.js'

export const namespaced = true
    
export const state = {
  income: null,
  outcome: null,
  sideBar: false,
  productDetail: null,
  tabItem: null
}
export const mutations = {
  SET_INCOME(state, payload) {
    state.income = payload
  },
  SET_OUTCOME(state, payload) {
    state.outcome = payload
  },
  SET_PRODUCT(state, payload) {
    state.productDetail = payload
  },
  ActiveSideBar(state) {
    state.sideBar = true
  },
  ACTIVE_TAB(state, payload) {
    state.tabItem = payload
  },
  DisabledSideBar(state) {
    state.sideBar = false
  }
}
export const actions = {
  async income({commit}) {
    await EventService.getIncome()
      .then(res => {
        commit('SET_INCOME', res.data)
      })
  },
  async filterIncme({commit}, data) {
    await EventService.getFilterIncome(data.last, data.current)
      .then(res => {
        commit('SET_INCOME', res.data)
      })
  },
  async outcome({commit}) {
    await EventService.getOutcome()
      .then(res => {
        commit('SET_OUTCOME', res.data)
      })
  },
  async filterOutcome({commit}, data) {
    await EventService.getFilterOutcome(data.last, data.current)
      .then(res => {
        commit('SET_OUTCOME', res.data)
      })
  },
  async product({commit}, id) {
    await EventService.getProduct(id)
      .then(res => {
        commit('SET_PRODUCT', res.data)
      })
  }

}
export const getters = {

}