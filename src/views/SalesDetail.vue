<template>
  <div class="main">
    <div class="header">
      <div class="search-wrapper">
        <input
          type="text"
          v-model="search"
          class="search"
          placeholder="search"
        />
        <v-icon dark class="icon">mdi-magnify</v-icon>
      </div>
      <div class="beetwen-date">
        <v-dialog
          ref="dialogtwo"
          v-model="modaltwo"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Start date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              dark
              class="start-date"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modaltwo = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialogtwo.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-dialog
          ref="dialogthree"
          v-model="modalThree"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateTwo"
              label="Finish date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              dark
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateTwo" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalThree = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="setDate('toFrom')"> OK </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>
    </div>
    <div class="my-5">
      <v-btn-toggle v-model="toggle_exclusive" rounded class="button-tabs">
        <v-btn color="#006D7C" dark @click="setDate('bugun')"> Bugun </v-btn>
        <v-btn color="#006D7C" dark @click="setDate('kecha')"> Kecha </v-btn>
        <v-btn color="#006D7C" dark @click="setDate('hafta')"> Hafta </v-btn>
        <v-btn color="#006D7C" dark @click="setDate('oy')"> Oy </v-btn>
        <v-btn color="#006D7C" dark @click="setDate('yil')"> Yil </v-btn>
        <v-btn color="#006D7C" dark @click="foo()">
          <v-icon color="white">mdi-calendar</v-icon>
          Kalendar
        </v-btn>
      </v-btn-toggle>
      <v-dialog ref="dialog" v-model="modal" width="290px">
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="setDate('calendar')"> OK </v-btn>
        </v-date-picker>
      </v-dialog>
    </div>

    <div class="data-table sales-data-table">
      <v-data-table
        :headers="headers"
        :items="getSaleFoods"
        class="elevation-1"
        light
        :no-data-text="noDate"
        hide-default-footer
        :search="search"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState, mapGetters } from "vuex";
import { DateTime } from "luxon";
export default {
  data() {
    return {
      search: "",
      date: "",
      dateTwo: "",
      modal: false,
      modaltwo: false,
      modalThree: false,
      toggle_exclusive: undefined,
      headers: [
        {
          text: "Mahsulot",
          align: "start",
          value: "amount",
          class: "header-style",
          divider: true,
        },
        {
          text: "Umumiy narx",
          value: "price",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "Sotilgan sana",
          value: "date",
          align: "center",
          class: "header-style",
          divider: true,
        },
      ],
      noDate: "Hali mahsulot sotilmadi",
    };
  },
  created() {
    store.commit("director/ActiveSideBar");
  },
  mounted() {
    store.dispatch("sales/salesProduct");
  },
  computed: {
    ...mapState("sales", {
      salesFoods: "salesFood",
    }),
    ...mapGetters("sales", {
      SaleData: "getSaleData",
    }),
    getSaleFoods() {
      let id = parseInt(this.$route.params.id);
      let data = [];
      if (this.SaleData(id)) {
        data = this.SaleData(id).total.detail;
        let summ = 0;
        data.forEach((item) => {
          summ += item.price;
        });
        data.push({
          amount: "Umumiy savdo summa",
          price: summ,
        });
      }
      return data;
    },
  },
  methods: {
    foo() {
      this.modal = true;
    },
    async setDate(payload) {
      let current = DateTime.now().toISODate();
      let last = undefined;
      if (payload == "bugun") {
        last = current;
      } else if (payload == "kecha") {
        last = DateTime.now().minus({ days: 1 }).toISODate();
        console.log(last);
      } else if (payload == "hafta") {
        last = DateTime.now().minus({ weeks: 1 }).toISODate();
        console.log(last);
      } else if (payload == "oy") {
        last = DateTime.now().minus({ months: 1 }).toISODate();
        console.log(last);
      } else if (payload == "yil") {
        last = DateTime.now().minus({ years: 1 }).toISODate();
      } else if (payload == "calendar") {
        last = this.date;
        current = this.date;
        this.modal = false;
      } else if (payload == "toFrom") {
        last = this.date;
        current = this.dateTwo;
        this.modalThree = false;
      }
      let data = {
        current,
        last,
      };
      await store.dispatch("sales/filterSaleFoods", data);
      this.noDate = "Bu oraliqda mahsulotlar sotilmagan";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.wrapper {
  display: flex;
}
.main {
  flex-grow: 1;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #052129;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
}
.search-wrapper {
  position: relative;
  width: 35%;
  flex-grow: 0;
}
.search {
  width: 100%;
  padding: 4px 10px;
  border: 1px solid #4b6b75;
  border-radius: 40px;
  color: white;
}
::placeholder {
  color: white;
  font-size: 15px;
}
.icon {
  position: absolute !important;
  top: 4px;
  right: 5px;
}
.button-tabs {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
.tab-button:not(:last-child) {
  margin-right: 20px;
}
.tab-button {
  padding: 15px 32px;
  border: 1px solid #006d7c;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #006d7c;
}
.actives {
  background-color: #006d7c;
  color: #ffffff;
}
button {
  opacity: 1 !important;
}
.v-btn {
  padding-left: 50px !important;
  padding-right: 50px !important;
}
.data-table {
  padding-left: 40px;
  padding-right: 40px;
}
.beetwen-date {
  display: flex;
}
.start-date {
  margin-right: 25px !important;
}
</style>