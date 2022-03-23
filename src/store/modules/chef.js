import EventService from "@/services/EventServices.js";
export const namespaced = true;

export const state =  {
  orderList: []
}
export const mutations =  {
  SET_ORDER_LIST(state, payload) {
    state.orderList = payload
  }
}

export const actions = {
  getOrder({commit}) {
    EventService.getChiefOrder()
      .then( res => {
        commit('SET_ORDER_LIST', res.data)
      })
  }
}