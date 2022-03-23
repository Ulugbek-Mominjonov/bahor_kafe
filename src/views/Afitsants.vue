<template>
  <div class="main">
    <div class="header">
      <div class="search-wrapper">
        <input
          type="text"
          v-model="search"
          class="search"
          placeholder="Qidiruv"
        />
        <v-icon dark class="icon">mdi-magnify</v-icon>
      </div>
      <div class="beetwen-date">
        <v-dialog
          ref="dialogtwo"
          v-model="modaltwo"
          :return-value.sync="date"
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="...dan"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              dark
              class="start-date"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-btn text small max-width="30px" color="red" @click="modaltwo = false">
              Bekor qilish
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text small max-width="30px"  color="primary" @click="$refs.dialogtwo.save(date)">
              Qabul qilish
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-dialog
          ref="dialogthree"
          v-model="modalThree"
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateTwo"
              label="gacha..."
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              dark
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateTwo" scrollable>
            <v-btn text small max-width="30px" color="red" @click="modalThree = false">
              Bekor qilish
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text small max-width="30px" color="primary" @click="setDate('toFrom')"> Qabul qilish </v-btn>
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
          <v-btn text small max-width="30px" color="red" @click="modal = false"> Bekor qilish </v-btn>
          <v-spacer></v-spacer>
          <v-btn text small max-width="30px" color="primary" @click="setDate('calendar')"> Qabul qilish </v-btn>
        </v-date-picker>
      </v-dialog>
    </div>

    <div class="data-table sales-data-table">
      <v-data-table
        :headers="headers"
        :items="getAfitsants"
        class="elevation-1"
        light
        :no-data-text="noDate"
        hide-default-footer
        :search="search"
        @click:row="handleClick"
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
      toggle_exclusive: undefined,
      headers: [
        {
          text: "Afitsant F.I.SH",
          align: "start",
          value: "name",
          class: "header-style",
          divider: true,
        },
        {
          text: "Zakazlar soni",
          value: "orderCount",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "Klientlar soni",
          value: "clientCount",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "Oylik",
          value: "amount",
          align: "center",
          class: "header-style",
          divider: true,
        },
      ],
      noDate: "Afitsantlar haqida ma'lumot",
    };
  },
  created() {
    store.dispatch("afitsant/afitsants");
  },
  mounted() {
    store.commit("director/ActiveSideBar");
  },
  computed: {
    ...mapState("afitsant", {
      allAfitsant: "allAfitsant",
    }),
    getAfitsants() {
      let data = [];
      let summ = 0;
      if (this.allAfitsant) {
        this.allAfitsant.forEach((element) => {
          data.push({
            id: element.id,
            name: element.firstName + " " + element.lastName,
            orderCount: Number(element.orderCount),
            clientCount: Number(element.clientCount),
            amount: element.amount,
          });
          summ += Number(element.amount);
        });
      }
      data.push({
        name: "Barcha afitsantlar Oylik summasi",
        amount: summ,
      });
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
      await store.dispatch("afitsant/filterAfitsants", data);
      this.noDate = "Bu oraliqda mahsulotlar sotilmagan";
    },
    handleClick(value) {
      this.$router.push({ name: "AfitsantDetail", params: { id: value.id } });
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