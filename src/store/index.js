import Vue from "vue";
import Vuex from "vuex";
import * as auth from "@/store/modules/auth0.js";
import * as stollar from "@/store/modules/stollar.js";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    stollar   
  }
});
