import EventService from '@/services/EventServices.js'

export const namespaced = true

export const state = {
  salesFood: null,
  foodDetail: null
}
export const mutations =  {
  SET_SALE_FOODS(state, payload) {
    state.salesFood = payload
  },
  SET_FILTER_FOODS(state, payload) {
    state.salesFood = payload
  }
}
export const actions = {
  async salesProduct({ commit }) {
    await EventService.getSales()
      .then( res => {
        commit('SET_SALE_FOODS', res.data)
      })
  },
  async filterSaleFoods({commit}, params) {
    await EventService.getFilterSaleProduct(params.last, params.current)
      .then(res => {
        console.log(res.data);
        commit('SET_FILTER_FOODS', res.data)
      })
  }
}
