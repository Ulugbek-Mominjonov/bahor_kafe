<template>
  <div class="d-flex main">
    <div class="ordered-foods">
      <div class="d-flex flex-column foods-list">
        <div class="component-info text-center mt-5 mb-3 align-center">
          <h2 class="component-title">"Bahor kafe"</h2>
          <p class="component-text">Bag'dod tumani, Bag'dod shaxarchasi</p>
          <v-alert type="success" class="d-inline-block px-14">
            {{ tableId }} - stol
          </v-alert>
        </div>
        <div v-for="(item, index) in foods" :key="index" class="mb-8">
          <p class="stoll-number">
            <span class="table-number">{{ item.todayId }} - zakaz</span>
            <span class="table-afitsant">Afitsant: {{ item.waiter }}</span>
          </p>
          <v-data-table
            :headers="headers"
            :items="item.details"
            :items-per-page="10"
            class="elevation-1"
            light
            no-data-text="Bu stol bo'sh"
            hide-default-footer
          ></v-data-table>
          <div class="d-flex total">
            <p class="total-heading">Umumiy summa</p>
            <p class="total-cost">{{ item.total }}</p>
          </div>
          <div
            class="my-5 buttons"
            :class="{
              'd-none': activeTable == null || foods.length == 0 ? true : false,
            }"
          >
            <v-btn class="button mb-5" color="primary" @click="print(index)"> Chek chiqarish </v-btn>
            <v-btn
              class="button mb-5"
              dark
              color="primary"
              @click="pay('cash', item.id)"
            >
              Naqd pul orqali to'lash
            </v-btn>
            <v-btn
              class="button mb-5"
              dark
              color="primary"
              @click="pay('card', item.id)"
            >
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
          <span>Kerakli Stolni tanlang!!!</span>
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
          <span>Bu stolda zakazlar mavjud emas</span>
        </v-alert>
      </div>
    </div>
    <div class="tables">
      <h1 class="tables-title">Stollar</h1>
      <ul class="table-list">
        <li
          class="table-item"
          v-for="table in tables"
          :key="table.id"
          :class="{ yellow: activeTable == table.id ? true : false }"
          @click="detail(table)"
        >
          {{ table.number }}
        </li>
      </ul>
    </div>
    <div class="check text-center">
      <template v-if="ordered">
        <div class="check-detail" v-for="(item, index) in ordered.orders" :key="index" v-show="checkData==index">
          <h1 class="text-center">Bahor kafe</h1>
          <p class="text-center">{{ordered.number}} - stol</p>
          <p class="d-flex justify-space-between">
            <span>Afitsant</span>
            <span>{{item.waiter}}</span>
          </p>
          <hr class="mt-3">
          <p class="d-flex justify-space-between">
            <span>Klientlar soni</span>
            <span>{{item.clientCount}}</span>
          </p>
          <hr class="mt-3">
          <!-- <p class="d-flex justify-space-between" v-for="(el, ind) in item.detail" :key="ind">
            <span>{{el.foodDetail.name}}</span>
            <span>{{Number(el.quantity)}}</span>
            <span>{{el.price}}</span>
          </p> -->
          <v-data-table
            :headers="headersCheck"
            :items="item.detail"
            class="elevation-1"
            no-data-text="Bu stol bo'sh"
            hide-default-footer
          ></v-data-table>
          <hr class="mt-3">
          <p class="d-flex justify-space-between">
            <span>Umumiy summa</span>
            <span>{{item.total}}</span>
          </p>
          <hr class="mt-3">
          <p>
            Xizmat har bir odam uchun 1000 so'm!!!
          </p>
          <p>
            {{new Date().toLocaleString()}}
          </p>
        </div>
      </template>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            To'lov haqida ma'lumot
          </v-card-title>

          <v-card-text class="mt-5">
            <v-alert type="success">{{ orderMessage }}</v-alert>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventServices.js";
import store from "@/store/index";
import { mapState } from "vuex";
import { DateTime } from "luxon";
export default {
  data() {
    return {
      headers: [
        {
          text: "Nomi",
          align: "start",
          sortable: false,
          value: "name",
          class: "header-style",
          divider: true,
        },
        {
          text: "Narxi (1ta) (so'm)",
          align: "center",
          value: "cost",
          class: "header-style",
          divider: true,
        },
        {
          text: "Miqdori",
          align: "center",
          value: "count",
          class: "header-style",
          divider: true,
        },
        {
          text: "Narxi (so'm)",
          align: "center",
          value: "summ",
          class: "header-style",
          divider: true,
        },
      ],
      headersCheck: [
        {
          text: "Nomi",
          align: "start",
          sortable: false,
          value: "foodDetail.name",
          class: "check-style",
          divider: true,
        },
        {
          text: "Soni",
          align: "center",
          value: "quantity",
          class: "check-style",
          divider: true,
        },
        {
          text: "Summa",
          align: "center",
          value: "price",
          class: "check-style",
          divider: true,
        },
      ],
      activeTable: null,
      table: null,
      isOrder: false,
      message: true,
      checkData: null,
      date: DateTime.now().toISODate(),
      orderMessage: "",
      dialog: false
    };
  },
  created() {
    store.dispatch("cashier/getTables");
    store.commit("cashier/ACTIVE_SIDEBAR");
  },
  mounted() {
    store.commit("cashier/ACTIVE_SIDEBAR");
  },
  computed: {
    ...mapState("cashier", {
      tables: "table",
      ordered: "food_detail",
    }),
    foods() {
      let data = [];
      if (this.ordered && this.ordered.orders) {
        this.ordered.orders.forEach((item) => {
          let foo = {
            id: item.id,
            todayId: item.todayId,
            waiter: item.waiter,
            total: item.total,
            details: [],
          };
          item.detail.forEach((element) => {
            foo.details.push({
              name: element.foodDetail.name,
              cost: element.foodDetail.price,
              count: parseInt(element.quantity),
              summ: element.price,
            });
          });
          foo.details.unshift({
            name: "Klentlar soni",
            cost: 1000,
            count: item.clientCount,
            summ: item.clientCost,
          });

          data.push(foo);
        });
      }
      return data;
    },
    tableId() {
      if (this.ordered) {
        return this.ordered.number;
      }
      return null;
    },
    getAfitsant() {
      if (this.ordered && this.ordered.order) {
        return this.ordered.order.waiter;
      }
      return null;
    },
  },
  methods: {
    detail(payload) {
      this.activeTable = payload.id;
      this.table = payload;
      this.message = false;
      store.dispatch("cashier/getDatail", payload.id).then(() => {
        if (payload.number == 0 && this.foods.length == 0) {
          this.$router.push({ name: "AddOrder", params: { id: payload.id } });
        } else if (this.foods.length == 0) {
          this.isOrder = true;
        } else {
          this.isOrder = false;
        }
      });
    },
    pay(type, id) {
      let data = {
        type: {
          payment_type: type,
        },
        id: id,
      };
      EventService.orderUpdate(data.id, data.type)
        .then(() => {
          this.orderMessage = "To'lov qabul qilindi!!!"
          this.dialog = true
          if (this.table.number != 0) {
            this.detail(this.table);
          } else {
            location.reload();
          }
        })
        .catch(() => {
          this.orderMessage = "To'lov qabul qilinmadi!!!"
          this.dialog = true
        });
    },
    print(value) {
      this.checkData = value
      setTimeout(function(){
        window.print()
      }, 1000);
    }
  },
  destroyed() {
    store.commit("cashier/DISABLED_SIDEBAR");
  },
};
</script>

<style scoped>
.check {
  display: none;
}
.yellow {
  background-color: #faff00;
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
  background-color: #c4c4c4;
}
.total-heading,
.total-cost {
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
.active {
  background-color: red;
}
.d-none {
  display: none !important;
}
@media print {
  .ordered-foods, .tables {
  display: none;
}
.check {
  display: block;
  width: 100%;
  padding: 5px;
  /* border: 1px solid #000; */
}
.check-detail {
  width: 100%;
  font-weight: 900;
}
.check-detail p {
  margin-top: 10px;
  margin-bottom: 0;
}
}
</style>