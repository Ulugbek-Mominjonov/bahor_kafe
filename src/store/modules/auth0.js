// import EventService from '@/services/EventServices.js'
// import { jwtDecrypt, tokenAlive } from "@/shared/jwtHelper";
import axios from "axios";
export const namespaced = true
    
export const state = {
  authData: {
    token: "",
    refreshToken: "",
  },
  loginStatus: ""

}
export const mutations = {
  saveTokenData(state, data) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    const newTokenData = {
      token: data.access,
      refreshToken: data.refresh,
      role: data.role
    };

    state.authData = newTokenData;
  },
  setLoginStatu(state, value) {
    state.loginStatus = value;
  },
  clear_data(state) {
    state.authData.token = ""
    state.authData.refresh = ""
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

}
export const actions = {
  async login({commit}, payload) {
    await axios.post("http://89.223.122.69:8001/api/cafe/auth/token/", payload)
      .then (response => {
        commit("saveTokenData", response.data);
        commit("setLoginStatu", "success");
      })
  }
}
export const getters = {
  getLoginStatus(state) {
    return state.loginStatus;
  },
  getAuthData(state) {
    return state.authData;
  }
}