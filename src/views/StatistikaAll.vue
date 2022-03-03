StatistikaAll<template>
  <div class="main">
    <div class="header">
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
      <v-btn color="warning" dark outlined @click="changeChart()"
        >Mahsulotlar kesimidagi foyda</v-btn
      >
    </div>
    <!-- chart  -->
    <!-- all  -->
    <ChartAll
      :chartData="chartDataAll"
      v-if="chartDataAll ? true : false"
      class="my-5"
    />
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";
import { DateTime } from "luxon";
import ChartAll from "@/components/ChartAll.vue";
export default {
  components: { ChartAll },
  data() {
    return {
      search: "",
      date: "",
      dateTwo: "",
      modaltwo: false,
      modalThree: false,
      toggle_exclusive: undefined,
    };
  },
  mounted() {
    store.commit("director/ActiveSideBar");
    if (localStorage.getItem("current") && localStorage.getItem("last")) {
      store.dispatch("statistika/filterProfit");
    } else {
      store.dispatch("statistika/getProfit");
    }
  },
  computed: {
    ...mapState("statistika", {
      profit: "profit",
    }),
    chartDataAll() {
      if (this.profit) {
        let profitMoney = this.profit;
        let datas = {
          type: "line",
          data: {
            labels: profitMoney.date,
            datasets: [
              {
                label: "Umumiy foyda",
                data: profitMoney.money,
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 3,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Foyda vaqt oraligida",
              },
            },
          },
        };
        return datas;
      }
      return null
    },
  },
  methods: {
    foo() {
      this.modal = true;
    },
    setDate() {
      let current = DateTime.now().toISODate();
      let last = undefined;
      last = this.date;
      current = this.dateTwo;
      this.modalThree = false;
      localStorage.setItem("current", current);
      localStorage.setItem("last", last);
      location.reload();
    },
    changeChart() {
      this.$router.push("/statistika");
    },
  },
  destroyed() {
    localStorage.removeItem("last");
    localStorage.removeItem("current");
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