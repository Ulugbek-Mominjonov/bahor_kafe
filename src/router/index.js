import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Menu from '../views/ProductShow.vue';
import OrderedFood from '../views/OrderedFood.vue';
import AccountantWindow from '../views/AccountantWin.vue';
import Director from '@/views/Director.vue';
import ProductDetailIncome from '@/views/ProductDetailIncome.vue';
import ProductDetailOutcome from '@/views/ProductDetailOutcome.vue';
import Sales from '@/views/Sales.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
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
  {
    path: "/accountant",
    name: "AccountantWindow",
    component: AccountantWindow,
  },
  {
    path: "/director",
    name: "director",
    component: Director,
    props: true
  },
  {
    path: "/productDetailIncome/:id",
    name: "productDetailIncome",
    component: ProductDetailIncome,
    props: true
  },
  {
    path: "/productDetailOutcome/:id",
    name: "productDetailOutcome",
    component: ProductDetailOutcome,
    props: true
  },
  {
    path: "/Sales",
    name: "Sales",
    component: Sales,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('access_token')) next({ name: 'Login' })
  else next()
})
export default router;
