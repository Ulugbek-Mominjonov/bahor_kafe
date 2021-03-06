import axios from "axios";
// import LocalStorageService from "./services/storage/localstorageservice";
import applyCaseMiddleware from 'axios-case-converter';
import router from "@/router/index";
import store from '@/store/index';

const instance = applyCaseMiddleware(axios.create({
  baseURL: "http://89.223.122.69:8001",
}))

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 && originalRequest.url.includes("/api/cafe/auth/token/refresh/")
    ) {
      store.commit('auth/clear_data')
      router.push("/"); 
      return Promise.reject(error);
    }

    else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      return instance
        .post("/api/cafe/auth/token/refresh/", {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("access_token", res.data.access);
            instance.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("access_token");
            return instance(originalRequest);
          }
        })
    }
    return Promise.reject(error);
  }
);

export default {
  getTables() {
    return instance.get("/api/cafe/tables/");
  },
  getOrdersOnTables(id) {
    return instance.get(`/api/cafe/orders/table/${id}/`);
  },
  getFoods() {
    return instance.get("/api/cafe/categories/");
  },
  getTableDetail(id) {
    return instance.get(`/api/cafe/order/${id}/`)
  },
  getTableDetailCashier(id) {
    return instance.get(`/api/cafe/table/${id}/`)
  },
  setOrder(data, id) {
    return instance.put(`/api/cafe/order/${id}/`, data)
  },
  postOrder(data) {
    return instance.post('/api/cafe/order/', data)
  },
  deleteOrder(id) {
    return instance.delete(`/api/cafe/order/${id}/`)
  },
  orderUpdate(id, data) {
    return instance.put(`/api/cafe/pay/${id}/`, data)
  },
  getIncome() {
    return instance.get('/api/backoffice/product/income/')
  },
  getFilterIncome(lte, gte) {
    return instance.get('/api/backoffice/product/income/', {
      params: {
        "dateBefore": gte,
        "dateAfter": lte
      }
    })
  },
  getOutcome() {
    return instance.get('/api/backoffice/product/outcome/')
  },
  getFilterOutcome(lte, gte) {
    return instance.get('/api/backoffice/product/outcome/', {
      params: {
        "dateBefore": gte,
        "dateAfter": lte
      }
    })
  },
  getProduct(id) {
    return instance.get(`/api/backoffice/product/${id}/`)
  },
  getSales() {
    return instance.get('/api/backoffice/food/')
  },
  getFilterSaleProduct(lte, gte) {
    return instance.get('/api/backoffice/food/', {
      params: {
        "dateBefore": gte,
        "dateAfter": lte
      }
    })
  },
  getAllAfitsants() {
    return instance.get('/api/backoffice/waiter/')
  },
  getFilterAfitsants(lte, gte) {
    return instance.get('/api/backoffice/waiter/', {
      params: {
        "dateBefore": gte,
        "dateAfter": lte
      }
    })
  },
  getAfitsant(id) {
    return instance.get(`/api/backoffice/waiter/${id}/`)
  },
  getAfitsantForCashier() {
    return instance.get('/api/cafe/waiters/')
  },
  setPayment(data) {
    return instance.post('/api/cafe/waiter/', data)
  },
  getCategory() {
    return instance.get('/api/backoffice/category/')
  },
  getStatistika() {
    return instance.get('/api/backoffice/chart/food/')
  },
  getCategoryFood(id) {
    return instance.get('/api/backoffice/chart/food/', {
      params: {
        category: id
      }
    })
  },
  getFilterFoods(id, last, current) {
    return instance.get('/api/backoffice/chart/food/', {
      params: {
        category: id,
        dateBefore: last,
        dateAfter: current
      }
    })
  },
  getFilterDateFoods(last, current) {
    return instance.get('/api/backoffice/chart/food/', {
      params: {
        dateBefore: last,
        dateAfter: current
      }
    })
  },
  getAllProfit() {
    return instance.get('/api/backoffice/profit-money/')
  },
  getFilterProfit(last, current){
    return instance.get('/api/backoffice/profit-money/', {
      params: {
        dateBefore: last,
        dateAfter: current
      }
    })
  },
  getChiefOrder() {
    return instance.get('/api/cafe/chef/')
  },
  updateStatus(id, payload) {
    return instance.put(`/api/cafe/chef/${id}/`, payload)
  }

};
