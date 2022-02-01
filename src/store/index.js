import Vue from "vue";
import Vuex from "vuex";
// import EventService from '@/services/EventService.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProducts: [
    ],
    stollar: [
      {
        nomer: 1,
        isActive: false
      },
      {
        nomer: 2,
        isActive: false
      },
      {
        nomer: 3,
        isActive: false
      },
      {
        nomer: 4,
        isActive: false
      },
      {
        nomer: 5,
        isActive: false
      },
      {
        nomer: 6,
        isActive: false
      },
      {
        nomer: 7,
        isActive: false
      },
      {
        nomer: 8,
        isActive: false
      },
      {
        nomer: 9,
        isActive: false
      },
      {
        nomer: 10,
        isActive: false
      },
      {
        nomer: 11,
        isActive: false
      },
      {
        nomer: 12,
        isActive: false
      },
      {
        nomer: 13,
        isActive: false
      },
      {
        nomer: 14,
        isActive: false
      },
      {
        nomer: 15,
        isActive: false
      },
    ],
    orderedList: {}
  },
  mutations: {
    SET_AFITSANT(state, value){
      state.afitsant = value;
    },
    ADD_PRODUCT(state, value) {
      let item = state.selectedProducts.findIndex(item => item.stoll_nomer == value.stoll)
      let index = state.selectedProducts[item].product.findIndex(item => item.name == value.product.name)
      if(index > -1){
        state.selectedProducts[item].product[index].count += 1
      }
      else {
        state.selectedProducts[item].product.push({
          id: value.product.id,
          name: value.product.name,
          count: 1,
          cost: value.product.cost
        })
      }
    },
    SET_ACTIVE(state, value) {
      let index = state.stollar.findIndex(item => item.nomer == value)
      state.stollar[index].isActive = true
      if(state.selectedProducts.stoll_nomer != value){
        state.selectedProducts.push({
          stoll_nomer: value,
          product: []
        })
      }
    },
    REMOVE_COUNT(state, {foo, el, index}) {
      if(foo > 1){
        state.selectedProducts[el].product[index].count -= 1
      }
      else if(foo == 1) {
        state.selectedProducts[el].product.splice(index, 1)
      }
    },
    ADD_COUNT(state, {el, index}) {
      state.selectedProducts[el].product[index].count += 1
    },
    SET_LIST(state, value) {
      state.orderedList = value;
    }
  },
  actions: {
    minus_count({commit, state}, value) {
      let el = state.selectedProducts.findIndex(item => item.stoll_nomer == value.pay)
      let foo = state.selectedProducts[el].product[value.index].count
      let index = value.index
      commit('REMOVE_COUNT', {foo, el, index})
      if(foo == 1) return null
      else {
        return value.index;
      }
    },
    plus_count({commit, state}, value) {
      let el = state.selectedProducts.findIndex(item => item.stoll_nomer == value.pay)
      let index = value.index
      commit('ADD_COUNT', {el, index})
      return value.index;
    },
    oderedList({commit, getters}, payload) {
      let order = getters.getStateById(payload)
      commit("SET_LIST", order)
    }
  },
  modules: {},
  getters: {
    getStateById: state => id => {
      return state.selectedProducts.find(item => item.stoll_nomer == id)
    }
  }
});
