import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Menu from '../views/ProductShow.vue';
import OrderedFood from '../views/OrderedFood.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home/:id",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/Menu/:id",
    name: "Menu",
    component: Menu,
    props: true
  },
  {
    path: "/orderFood",
    name: "OrderedFood",
    component: OrderedFood,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
