<template>
  <div class="d-flex main">
    <div class="ordered-foods">
        <div class="d-flex flex-column foods-list">
          <div class="component-info text-center mt-5 mb-3 align-center">
            <h2 class="component-title">"Bahor kafe"</h2>
            <p class="component-text">Bag'dod tumani, Bag'dod shaxarchasi</p>
            <p class="stoll-number">
              <span class="table-number">{{tableId}} - stoll</span>
              <span class="table-afitsant">Afitsant: {{getAfitsant}}</span>
            </p>
          </div>
          <v-data-table
            :headers="headers"
            :items="foods"
            :items-per-page="10"
            class="elevation-1"
            light
            no-data-text="Bu stoll bo'sh"
          ></v-data-table>
          <div class="d-flex total">
            <p class="total-heading">Umumiy summa</p>
            <p class="total-cost">{{getTotal}}</p>
          </div>
        </div>
        <div class="my-5 buttons" :class="{'d-none': (activeTable == null || foods.length==0) ? true: false}">
            <v-btn class="button" color="primary">
              Chek chiqarish
            </v-btn>
            <v-btn class="button" dark color="primary" @click="pay('cash')">
              Naqd pul orqali to'lash
            </v-btn>
            <v-btn class="button" dark color="primary" @click="pay('card')">
              Plastik orqali to'lash
            </v-btn>
          </div>
    </div>
    <div class="tables">
      <h1 class="tables-title">Stollar</h1>
      <ul class="table-list">
        <li class="table-item" v-for="table in tables" :key="table.id"  :class="{active: !table.isFree, yellow: activeTable==table.id ? true: false}" @click="detail(table)">{{table.number}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import store from '@/store/index';
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        headers: [
          {
            text: 'Nomi',
            align: 'start',
            sortable: false,
            value: 'name',
            class: "header-style",
            divider: true
          },
          { text: "Narxi (1ta) (so'm)", align: 'center', value: "cost", class: "header-style", divider: true },
          { text: "Miqdori", align: 'center', value: "count", class: "header-style", divider: true },
          { text: "Narxi (so'm)", align: 'center', value: "summ", class: "header-style", divider: true },
        ],
        activeTable: null
      }
    },
    created() {
      store.commit('cashier/ACTIVE_SIDEBAR')
      store.dispatch('cashier/getTables')
    },
    computed: {
      ...mapState('cashier',{
        tables: 'table',
        ordered: 'food_detail'
      }),
      foods() {
        let data = []
        if(this.ordered && this.ordered.order) {
          this.ordered.order.detail.forEach(element => {
            data.push({
              name: element.foodDetail.name,
              cost: element.foodDetail.price,
              count: parseInt(element.quantity),
              summ: element.price
            })
          })
          data.unshift({
            name: "Klentlar soni",
            cost: 1000,
            count: this.ordered.order.clientCount,
            summ: this.ordered.order.clientCost
          })
        }
        return data
      },
      tableId() {
        if(this.ordered) {
          return this.ordered.number
        }
        return null
      },
      getAfitsant() {
        if(this.ordered && this.ordered.order) {
          return this.ordered.order.waiter
        }
        return null
      },
      getTotal() {
        if(this.ordered && this.ordered.order) {
          return this.ordered.order.total
        }
        return null
      }
    },
    methods: {
      detail(payload) {
        this.activeTable = payload.id
        if(payload.number == 0 && payload.isFree) {
          this.$router.push({name: "Menu", params: {id: payload.id}})
        }
        store.dispatch('cashier/getDatail', payload.id)
      },
      pay(type) {
        let data = {
          "payment": {
            "total_amount": this.ordered.order.total,
            "payment_type": type
          }
        }
        store.dispatch('cashier/payment', data)
          .then(() => {
            this.activeTable = null
            location.reload()
          })
      }
    },
    destroyed() {
      store.commit('cashier/DISABLED_SIDEBAR')
    }
    
  }
</script>

<style scoped>
.yellow {
  background-color: #FAFF00;
}
.my-container {
  padding-left: 20px;
  padding-right: 20px;
}
.main {
  flex-grow: 1;
}
.ordered-foods {
  width: 50%;
  padding-left: 15px;
}
.foods-list {
  height: calc(100vh - 76px);
  overflow-y: scroll;
}
.stoll-number {
  width: 70%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  color: black;
  font-weight: 500;
}
.total {
  margin-top: auto;
  justify-content: space-between;
  align-items: center;
  padding: 8px 25px;
  background-color: #C4C4C4;
}
.total-heading, .total-cost {
  margin: 0;
  font-size: 16px;
  line-height: 25px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.button {
  font-size: 14px !important;
  text-transform: initial;
}
.tables {
  width: 50%;
  text-align: center;
  height: 100vh;
  overflow-y: scroll;
}
.tables-title {
  margin-top: 20px;
  margin-bottom: 30px;
}
.table-list {
  width: 100%;
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  gap: 3%;
}
.table-item {
  width: 28%;
  font-weight: 800;
  font-size: 60px;
  line-height: 120px;
  margin-bottom: 2%;
  color: #000000;
  background: rgba(20, 255, 0, 0.5);
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
}
.active{
  background-color: red;
}
.d-none {
  display: none !important;
}
</style>