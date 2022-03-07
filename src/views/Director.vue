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
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
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
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="setDate('toFrom')"> OK </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>
    </div>
    <div class="button-tabs">
      <button
        class="tab-button"
        @click="changeMenu('kirim')"
        :class="{ actives: tabProduct == 'kirim' ? true : false }"
      >
        Mahsulot kirimi
      </button>
      <button
        class="tab-button"
        @click="changeMenu('chiqim')"
        :class="{ actives: tabProduct == 'chiqim' ? true : false }"
      >
        Mahsulot chiqimi
      </button>
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

    <div class="data-table">
      <v-data-table
        :headers="header"
        :items="product"
        class="elevation-1"
        light
        :no-data-text="noDate"
        @click:row="handleClick"
        :search="search"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";
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
      tabProduct: "kirim",
      toggle_exclusive: undefined,
      headersIncome: [
        {
          text: "Mahsulot",
          align: "start",
          value: "name",
          class: "header-style",
          divider: true,
        },
        {
          text: "Umumiy miqdori",
          value: "totalValue",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "O'lchov birligi",
          value: "type",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "Umumiy narx(so'm)",
          value: "totalPrice",
          align: "center",
          class: "header-style",
          divider: true,
        },
      ],
      headersOutcome: [
        {
          text: "Mahsulot",
          align: "start",
          value: "name",
          class: "header-style",
          divider: true,
        },
        {
          text: "Umumiy miqdori",
          value: "totalValue",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "O'lchov birligi",
          value: "type",
          align: "center",
          class: "header-style",
          divider: true,
        },
      ],
      noDate: "Mahsulot hali kelmadi",
    };
  },
  created() {
    store.dispatch("director/income");
    store.dispatch("director/outcome");
  },
  mounted() {
    store.commit("director/ActiveSideBar");
  },
  computed: {
    ...mapState("director", {
      income: "income",
      outcome: "outcome",
    }),
    product() {
      if (this.tabProduct == "kirim") {
        return this.getIncome;
      } else {
        return this.getOutcome;
      }
    },
    header() {
      if (this.tabProduct == "kirim") {
        return this.headersIncome;
      } else {
        return this.headersOutcome;
      }
    },
    getIncome() {
      let data = [];
      if (this.income) {
        this.income.forEach((element) => {
          data.push({
            id: element.product,
            name: element.name,
            type: element.type,
            totalValue: element.totalValue,
            totalPrice: element.totalPrice,
          });
        });
      }
      return data;
    },
    getOutcome() {
      let data = [];
      if (this.outcome) {
        this.outcome.forEach((element) => {
          data.push({
            id: element.product,
            name: element.name,
            type: element.type,
            totalValue: element.totalValue,
          });
        });
      }
      return data;
    },
  },
  methods: {
    async changeMenu(payload) {
      this.tabProduct = payload;
    },
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
      if (this.tabProduct == "kirim") {
        console.log(1);
        await store.dispatch("director/filterIncme", data);
        this.noDate = "Bu oraliqda mahsulot kelmagan";
      } else {
        console.log(2);
        await store.dispatch("director/filterOutcome", data);
        this.noDate = "Bu oraliqda mahsulot ishlatilmagan";
      }
    },
    handleClick(value) {
      console.log(value);
      if (this.tabProduct == "kirim") {
        this.$router.push({
          name: "productDetailIncome",
          params: { id: value.id },
        });
      } else {
        this.$router.push({
          name: "productDetailOutcome",
          params: { id: value.id },
        });
      }
    },
  },
  destroyed() {
    store.commit("director/DisabledSideBar");
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