import Vue from "vue";
import Vuex from "vuex";
import * as auth from "@/store/modules/auth0.js";
import * as stollar from "@/store/modules/stollar.js";
import * as cashier from "@/store/modules/cashier.js";
import * as director from "@/store/modules/director.js";
import * as sales from "@/store/modules/sales.js";
import * as afitsant from "@/store/modules/afitsant.js";
import * as statistika from "@/store/modules/statistika.js";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    stollar,
    cashier,
    director,
    sales ,
    afitsant,
    statistika
  }
});
