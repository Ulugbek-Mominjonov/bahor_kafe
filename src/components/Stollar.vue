<template>
  <div class="stoll-link">
    <div class="stoll" @click="table()">{{ nomer.number }}</div>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> Ushbu stoldagi zakazlar </v-card-title>
        <v-card-actions class="justify-center flex-wrap">
          <v-btn
            class="mx-2 mb-2"
            fab
            dark
            v-for="(item, index) in getOrdersOnTables"
            :key="index"
            :class="{'yellow': item.status == 'cooked', 'red': item.status == 'cooking', 'green': item.status == 'given'}"
            @click="changeOrder(item.id)"
          >
            {{ item.todayId }}
          </v-btn>
          <v-btn class="mx-2" fab dark color="indigo" @click="addOrder">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";
export default {
  props: {
    nomer: {
      type: Object,
    },
    afitsant: {
      type: String,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState("stollar", {
      ordersTables: "ordersTable",
    }),
    getOrdersOnTables() {
      if (this.ordersTables) {
        return this.ordersTables;
      }
      return null;
    },
  },
  methods: {
    addOrder() {
      let id = this.nomer.id;
      this.$router.push({ name: "AddOrder", params: { id: id } });
      this.dialog = false;
    },
    table() {
      let id = this.nomer.id;
      store.dispatch("stollar/ordersOnTables", id).then(() => {
        this.dialog = true;
      });
    },
    changeOrder(value) {
      console.log(value);
      this.$router.push({ name: "Menu", params: { id: value } });
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.stoll {
  width: 184px;
  padding: 46px 36px;
  font-weight: 800;
  font-size: 96px;
  line-height: 112px;
  color: #000000;
  background: rgba(20, 255, 0, 0.5);
  border-radius: 20px;
  text-align: center;
}
.stoll-link {
  display: block;
  cursor: pointer;
}
.active {
  background-color: red;
}
.stoll-link .cooked {
  background-color: #4caf50 !important;
}
</style>