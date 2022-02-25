import EventService from '@/services/EventServices.js'

export const namespaced = true
    
export const state = {
  table: null,
  food_detail: null,
  sideBar: false,
  afitsants: []
}
export const mutations = {
  SET_TABLES(state, payload) {
    state.table = payload
  },
  SET_DETAIL(state, payload) {
    state.food_detail = payload
  },
  ACTIVE_SIDEBAR (state) {
    state.sideBar = true
  },
  DISABLED_SIDEBAR (state) {
    state.sideBar = false
  },
  SET_AFITSANT(state, payload) {
    state.afitsants = payload
  }
}
export const actions = {
  async getTables({commit}) {
    await EventService.getTables()
      .then(res => {
        commit('SET_TABLES', res.data)
      })
      .catch(err => alert(err))
  },
  async getDatail({commit}, id) {
    let res = await EventService.getTableDetail(id)
      .catch(err => alert(err))
    commit('SET_DETAIL', res.data)
    console.log(res.data);
  },
  async payment({state}, payload) {
    let id = state.food_detail.order.id
    await EventService.orderUpdate(id, payload)
      .then (() => {
        alert("To'lov qabul qilindi!")
      })
      .catch(() => {
        alert("Bu buyurtma uchun pul to'lanib bo'lingan")
      })
  },
  async afitsants({commit}) {
    await EventService.getAfitsantForCashier()
      .then(res => {
        commit('SET_AFITSANT', res.data)
      })
  }

}
export const getters = {

}