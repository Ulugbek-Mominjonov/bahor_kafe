import EventService from "@/services/EventServices.js";
export const namespaced = true;

export const state = {
  table: null,
  foods: null,
  ordered: {},
};

export const mutations = {
  SET_TABLE(state, data) {
    state.table = data;
  },
  SET_FOODS(state, data) {
    state.foods = data;
  },
  SET_DETAIL(state, value) {
    if ("message" in value.data) {
      state.ordered = {
        id: value.id,
        order: {
          clientCount: 0,
          detail: [
          ],
        },
      };
    } else {
      state.ordered = value.data;
    }
  },
  ADD_FOODS(state, {value,index}) {
    if(index > -1){
      let foo = parseInt(state.ordered.order.detail[index].quantity) + 1;
      state.ordered.order.detail[index].quantity = foo;
    }
    else {
      state.ordered.order.detail.push({
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
    let id = parseInt(state.ordered.order.detail[index].quantity)
    if(id > 1){
      state.ordered.order.detail[index].quantity = id - 1;
    }
    else if(id == 1) {
      state.ordered.order.detail.splice(index, 1)
    }
  },
  ADD_COUNT(state, index) {
    let foo = parseInt(state.ordered.order.detail[index].quantity) + 1;
      state.ordered.order.detail[index].quantity = foo;
  },
  MINUS_CLIENT(state) {
    let item = state.ordered.order.clientCount
    if(item != 0) {
      state.ordered.order.clientCount -= 1
    }
  },
  ADD_CLIENT(state) {
    state.ordered.order.clientCount += 1
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
  async detail({ commit }, id) {
    await EventService.getTableDetail(id).then((res) => {
      let value = {
        data: res.data,
        id: id,
      };
      commit("SET_DETAIL", value);
    });
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
    let item = state.ordered.order.clientCount
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
  async setOrder({commit}, value) {
    let response = await EventService.setOrder(value).catch(err => console.log(err))
    commit("FOO")
    console.log(response.data);
  },
  async deleteOrders({state}) {
    let id = state.ordered.order.id
    await EventService.deleteOrder(id)
      .then(res => console.log(res))
  }
};

export const getters = {
  getFoodById: (state) => (id) => {
    return state.ordered.order.detail.findIndex(item => item.food == id)
  }
}
