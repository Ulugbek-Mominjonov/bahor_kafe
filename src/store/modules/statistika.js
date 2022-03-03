import EventService from '@/services/EventServices.js'

export const namespaced = true

export const state = {
  allCategory: [],
  allFoods: null,
  profit: null
}
export const mutations = {
  SET_CATEGORY(state, payload) {
    state.allCategory = payload
  },
  SET_FOODS(state, payload) {
    state.allFoods = payload
  },
  SET_CAT(state, payload) {
    state.allFoods = payload
  },
  SET_PROFIT(state, payload) {
    state.profit = payload
  }

}
export const actions = {
  async category({commit}) {
    await EventService.getCategory()
      .then (res => {
        commit('SET_CATEGORY', res.data)
      })
  },
  foods({commit}) {
    EventService.getStatistika()
      .then(res => {
        commit('SET_FOODS', res.data)
      })
  },
  getCategory({commit}, id) {
    EventService.getCategoryFood(id)
      .then(res => {
        commit('SET_CAT', res.data)
      })
  },
  getFilter({commit}) {
    let id = localStorage.getItem('foodId')
    let last = localStorage.getItem('last')
    let current = localStorage.getItem('current')
    EventService.getFilterFoods(id, current, last)
    .then(res => {
      commit('SET_CAT', res.data)
    })
  },
  getFilterDate({commit}) {
    let last = localStorage.getItem('last')
    let current = localStorage.getItem('current')
    EventService.getFilterDateFoods(current, last)
    .then(res => {
      commit('SET_CAT', res.data)
    })
  },
  getProfit({commit}) {
    EventService.getAllProfit()
      .then(res => {
        console.log(res.data);
        commit('SET_PROFIT', res.data)
      })
  },
  filterProfit({commit}) {
    let last = localStorage.getItem('last')
    let current = localStorage.getItem('current')
    EventService.getFilterProfit(current, last)
      .then(res => {
        commit('SET_PROFIT', res.data)
      })
  }
}


