import EventService from "@/services/EventServices.js";
export const namespaced = true;

export const state = {
  table: null,
  foods: null,
  ordered: {},
  ordersTable: []
};

export const mutations = {
  SET_TABLE(state, data) {
    state.table = data;
  },
  SET_ORDERS_TABLE(state, data) {
    state.ordersTable = data
  },
  SET_FOODS(state, data) {
    state.foods = data;
  },
  SET_DETAIL(state, value) {
    state.ordered = value;
  },
  ADD_FOODS(state, {value,index}) {
    if(index > -1){
      let foo = parseInt(state.ordered.details[index].quantity) + 1;
      state.ordered.details[index].quantity = foo;
    }
    else {
      state.ordered.details.push({
        food: value.id,
        foodDetail: {
          name: value.name,
          price: value.price
        },
        quantity: 1
      })
    }
  },
  REMOVE_COUNT(state, index) {
    let id = parseInt(state.ordered.details[index].quantity)
    if(id > 1){
      state.ordered.details[index].quantity = id - 1;
    }
    else if(id == 1) {
      state.ordered.details.splice(index, 1)
    }
  },
  ADD_COUNT(state, index) {
    let foo = parseInt(state.ordered.details[index].quantity) + 1;
      state.ordered.details[index].quantity = foo;
  },
  MINUS_CLIENT(state) {
    let item = state.ordered.clientCount
    if(item != 0) {
      state.ordered.clientCount -= 1
    }
  },
  ADD_CLIENT(state) {
    state.ordered.clientCount += 1
  },
  FOO() {
    console.log("Ma'lumot qabul qilindi!!!");
  }
};

export const actions = {
  async table({ commit }) {
    await EventService.getTables().then((response) => {
      commit("SET_TABLE", response.data);
    });
  },
  async foods({ commit }) {
    await EventService.getFoods().then((res) => {
      commit("SET_FOODS", res.data);
    });
  },
  detail({ commit }, id) {
    return EventService.getTableDetail(id)
      .then(res => {
      commit("SET_DETAIL", res.data);
    })
  },
  createOrder({commit}, id) {
    let data = {
      table: id,
      clientCount: 0,
      details: []
    }
    commit("SET_DETAIL", data)
  },
  food({commit, getters}, value) {
    let index = getters.getFoodById(value.id)
    commit("ADD_FOODS", {value, index})
  },
  minus_count({commit, getters}, id) {
    let index = getters.getFoodById(id)
    if(index == -1) return null
    else {
      commit('REMOVE_COUNT', index)
      return id;
    }
  },
  plus_count({commit, getters}, id) {
    let index = getters.getFoodById(id)
    commit('ADD_COUNT', index)
    return id;
  },
  clientMinus({commit, state}, index) {
    let item = state.ordered.clientCount
    if(item == 0) {
      return null;
    } else {
      commit('MINUS_CLIENT')
      return index
    }
  },
  clientAdd({commit}, index) {
    commit('ADD_CLIENT')
    return index
  },
  setOrder({commit, state}, value) {
    let id = state.ordered.id
    EventService.setOrder(value, id).catch(err => console.log(err))
    commit("FOO")
  },
  async deleteOrders({state}) {
    let id = state.ordered.order.id
    await EventService.deleteOrder(id)
      .then(res => console.log(res))
  },
  ordersOnTables({commit}, id) {
    EventService.getOrdersOnTables(id)
      .then(res => {
        commit('SET_ORDERS_TABLE', res.data)
      })
  }
};

export const getters = {
  getFoodById: (state) => (id) => {
    return state.ordered.details.findIndex(item => item.food == id)
  }
}
