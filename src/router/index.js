import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Menu from '../views/ProductShow.vue';
import AccountantWindow from '../views/AccountantWin.vue';
import Director from '@/views/Director.vue';
import ProductDetailIncome from '@/views/ProductDetailIncome.vue';
import ProductDetailOutcome from '@/views/ProductDetailOutcome.vue';
import Sales from '@/views/Sales.vue';
import SalesDetail from '@/views/SalesDetail.vue';
Vue.use(VueRouter);
import Afitsants from '@/views/Afitsants.vue';
import AfitsantDetail from '@/views/AfitsantDetail.vue';
import AfitsantCashierWin from '@/views/AfitsantCashierWin.vue';
import ErrorTemplate from '@/views/ErrorTemplate.vue';
import Statistika from '@/views/Statistika.vue';
import StatistikaAll from '@/views/StatistikaAll.vue';
import AddOrder from '@/views/AddOrder.vue';
import Chief from '@/views/Chief.vue';
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
    props: true,
    meta: {
      role: 'waiter',
    },
  },
  {
    path: "/Menu/:id",
    name: "Menu",
    component: Menu,
    props: true,
    meta: {
      role: 'waiter',
    },
  },
  {
    path: "/addOrder/:id",
    name: "AddOrder",
    component: AddOrder,
    props: true,
    meta: {
      role: 'waiter',
    },
  },
  {
    path: "/accountant",
    name: "AccountantWindow",
    component: AccountantWindow,
    meta: {
      role: 'cashier',
    },
  },
  {
    path: "/director",
    name: "director",
    component: Director,
    props: true,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/productDetailIncome/:id",
    name: "productDetailIncome",
    component: ProductDetailIncome,
    props: true,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/productDetailOutcome/:id",
    name: "productDetailOutcome",
    component: ProductDetailOutcome,
    props: true,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/Sales",
    name: "Sales",
    component: Sales,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/SalesDetail/:id",
    name: "SalesDetail",
    component: SalesDetail,
    props: true,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/afitsantlar",
    name: "Afitsants",
    component: Afitsants,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/AfitsantDetail/:id",
    name: "AfitsantDetail",
    component: AfitsantDetail,
    props: true,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/statistika",
    name: "Statistika",
    component: Statistika,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/statistikaAll",
    name: "StatistikaAll",
    component: StatistikaAll,
    meta: {
      role: 'director',
    },
  },
  {
    path: "/afitsants",
    name: "cashierAfitsant",
    component: AfitsantCashierWin,
    meta: {
      role: 'cashier',
    },
  },
  {
    path: "/chef",
    name: "Chef",
    component: Chief,
    meta: {
      role: 'chef',
    },
  },
  {
    path: '/403',
    name: 'error.403',
    component: ErrorTemplate,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const role = to.meta && to.meta.role;
  if (to.name !== 'Login' && !localStorage.getItem('access_token')) next({ name: 'Login' })
  else if (to.fullPath == "/" && localStorage.getItem('access_token') && localStorage.getItem('role') == 'waiter') {
    next({name: "Home"})
  }
  else if (to.fullPath == "/" && localStorage.getItem('access_token') && localStorage.getItem('role') == 'cashier') {
    next({name: "AccountantWindow"})
  }
  else if (to.fullPath == "/" && localStorage.getItem('access_token') && localStorage.getItem('role') == 'chef') {
    next({name: "Chef"})
  }
  else if (to.fullPath == "/" && localStorage.getItem('access_token') && localStorage.getItem('role') == 'director') {
    next({name: "director"})
  }
  else if(role && role !== localStorage.getItem('role')) {
    if(role === 'waiter'){
      next()
    }
    else {
      next({name: "error.403"})
    }
  }
  else {
    next()
  }
})
export default router;
