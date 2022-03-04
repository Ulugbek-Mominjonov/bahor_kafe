<template>
  <div class="d-flex main">
    <div class="ordered-foods">
        <div class="d-flex flex-column foods-list">
          <div class="component-info text-center mt-5 mb-3 align-center"> 
            <h2 class="component-title">"Bahor kafe"</h2>
            <p class="component-text">Bag'dod tumani, Bag'dod shaxarchasi</p>
            <v-alert type="success" class="d-inline-block px-14">
              {{tableId}} - stoll
            </v-alert>
          </div>
          <div v-for="(item, index) in foods" :key="index" class="mb-8">
            <p class="stoll-number">
              <span class="table-number">{{item.todayId}} - zakaz</span>
              <span class="table-afitsant">Afitsant: {{item.waiter}}</span>
            </p>
            <v-data-table
              :headers="headers"
              :items="item.details"
              :items-per-page="10"
              class="elevation-1"
              light
              no-data-text="Bu stoll bo'sh"
              hide-default-footer
            ></v-data-table>
            <div class="d-flex total">
              <p class="total-heading">Umumiy summa</p>
              <p class="total-cost">{{item.total}}</p>
            </div>
            <div class="my-5 buttons" :class="{'d-none': (activeTable == null || foods.length==0) ? true: false}">
                <v-btn class="button mb-5" color="primary">
                  Chek chiqarish
                </v-btn>
                <v-btn class="button mb-5" dark color="primary" @click="pay('cash', item.id)">
                  Naqd pul orqali to'lash
                </v-btn>
                <v-btn class="button mb-5" dark color="primary" @click="pay('card', item.id)">
                  Plastik orqali to'lash
                </v-btn>
            </div>
          </div>
          <v-alert
            v-if="message"
            border="top"
            colored-border
            type="info"
            elevation="2"
            height="100"
            class="d-flex align-center justify-center"
          >
            <span>Kerakli Stollni tanlang!!!</span>
          </v-alert>
          <v-alert
            v-if="isOrder"
            border="top"
            colored-border
            type="info"
            elevation="2"
            height="100"
            class="d-flex align-center justify-center"
          >
            <span>Bu stollda zakazlar mavjud emas</span>
          </v-alert>
        </div>
    </div>
    <div class="tables">
      <h1 class="tables-title">Stollar</h1>
      <ul class="table-list">
        <li class="table-item" v-for="table in tables" :key="table.id"  :class="{yellow: activeTable==table.id ? true: false}" @click="detail(table)">{{table.number}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import EventService from '@/services/EventServices.js'
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
        activeTable: null,
        table: null,
        isOrder: false,
        message: true
      }
    },
    created() {
      store.dispatch('cashier/getTables')
      store.commit('cashier/ACTIVE_SIDEBAR')
    },
    mounted() {
      store.commit('cashier/ACTIVE_SIDEBAR')
    },
    computed: {
      ...mapState('cashier',{
        tables: 'table',
        ordered: 'food_detail'
      }),
      foods() {
        let data = []
        if(this.ordered && this.ordered.orders) {
          this.ordered.orders.forEach(item => {
            let foo = {
              id: item.id,
              todayId: item.todayId,
              waiter: item.waiter,
              total: item.total,
              details: []
            }
            item.detail.forEach(element => {
              foo.details.push({
                name: element.foodDetail.name,
                cost: element.foodDetail.price,
                count: parseInt(element.quantity),
                summ: element.price
              })
            })
            foo.details.unshift({
              name: "Klentlar soni",
              cost: 1000,
              count: item.clientCount,
              summ: item.clientCost
            })

            data.push(foo)
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
    },
    methods: {
      detail(payload) {
        this.activeTable = payload.id
        this.table = payload
        this.message = false
        store.dispatch('cashier/getDatail', payload.id)
          .then(() => {
            if(payload.number == 0 && this.foods.length == 0) {
              this.$router.push({name: 'AddOrder', params: {id: payload.id}})
            }
            else if(this.foods.length == 0) {
              this.isOrder = true
            }
            else {
              this.isOrder = false
            }
          })
      },
      pay(type, id) {
        let data = {
          type: {
            "payment_type": type,
          },
          id: id
        }
        EventService.orderUpdate(data.id, data.type)
        .then (() => {
          alert("To'lov qabul qilindi!")
          if(this.table.number != 0) {
            this.detail(this.table)
          }
          else {
            location.reload()
          }
        })
        .catch(() => {
          alert("Bu buyurtma uchun pul to'lanib bo'lingan")
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
  width: 55%;
  padding-left: 15px;
}
.foods-list {
  height: 100vh;
  overflow-y: scroll;
  padding-right: 15px;
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
  flex-wrap: wrap;
}
.button {
  font-size: 14px !important;
  text-transform: initial;
}
.tables {
  width: 45%;
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
  line-height: 105px;
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