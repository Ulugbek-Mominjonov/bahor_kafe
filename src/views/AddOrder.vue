<template>
  <div class="my-container">
    <template v-if="!notEnter">
      <v-card class="tab-wrapper">
        <v-tabs center-active>
          <v-tab
            class="tab-item"
            v-for="(tab, index) in allFoods"
            :key="index"
            @click="selectedItem(tab.name)"
            >{{ tab.name }}</v-tab
          >
          <v-tab class="tab-item" @click="selectedItem('Barchasi')"
            >Barchasi</v-tab
          >
        </v-tabs>
      </v-card>
      <div class="main-menu d-flex">
        <div class="products">
          <Product
            v-for="(item, index) in allFoods"
            :key="index"
            :product="item"
            :stoll="tableId"
            v-show="tabItem == item.name"
          />
          <template v-if="tabItem == 'Barchasi'">
            <Product
              v-for="(item, index) in allFoods"
              :key="index.name"
              :product="item"
              :stoll="tableId"
            />
          </template>
          <br />
        </div>
        <div class="ordered-list">
          <h2 class="product-name">
            Zakalar ro'yhati <span>{{ tableId }} - stoll</span>
          </h2>
          <ul class="selected-list">
            <li class="selected-item">
              <span class="left-col">Nomi</span>
              <span class="rigth-col">Soni</span>
            </li>
            <li
              class="selected-item"
              @click="selected_item(-1)"
              :class="{ 'active-el': selected == -1 ? true : false }"
            >
              <span class="left-col">Klent soni</span>
              <span class="rigth-col">{{ getClientCount }}</span>
            </li>
            <li
              class="selected-item"
              v-for="(item, index) in getDetail"
              :key="index"
              @click="selected_item(item.food)"
              :class="{ 'active-el': selected == item.food ? true : false }"
            >
              <span class="left-col">{{ item.foodDetail.name }}</span>
              <span class="rigth-col">{{ parseInt(item.quantity) }}</span>
            </li>
          </ul>

          <div class="d-flex justify-space-between my-5 changing-buttons">
            <v-btn
              class="minus-btn"
              dark
              color="error"
              :disabled="selected == null ? true : false"
              @click="remove_item()"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>

            <v-btn
              class="plus-btn"
              dark
              color="indigo"
              :disabled="selected == null ? true : false"
              @click="add_item()"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </div>

          <div class="mb-5 d-flex justify-center buttons">
            <v-btn class="order-btn" dark color="success" @click="order()">
              Zakaz berish
            </v-btn>
          </div>

          <div class="d-flex mb-5">
            <v-btn
              class="back-table"
              dark
              color="orange darken-2"
              outlined
              @click="back()"
            >
              <v-icon dark left> mdi-arrow-left </v-icon>
              Orqaga
            </v-btn>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <v-alert outlined type="warning" prominent border="left" class="alert">
        {{ errorMessage }}
      </v-alert>
    </template>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Zakaz haqida ma'lumot
          </v-card-title>

          <v-card-text class="mt-5">
            <v-alert type="success">{{ orderMessage }}</v-alert>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogFalse"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventServices.js";
import Product from "@/components/Product.vue";
import { mapState, mapGetters } from "vuex";
import store from "@/store/index";
export default {
  components: {
    Product,
  },
  data() {
    return {
      tabItem: "Barchasi",
      selected: null,
      notEnter: false,
      errorMessage: "",
      dialog: false,
      orderMessage: "",
    };
  },
  created() {
    store.dispatch("stollar/foods");
    let key = parseInt(this.$route.params.id);
    store.dispatch("stollar/createOrder", key).catch((error) => {
      this.notEnter = true;
      this.errorMessage = error.response.data.message;
    });
  },
  computed: {
    ...mapGetters(["getStateById"]),
    ...mapState("stollar", {
      allFoods: "foods",
      ordered: "ordered",
    }),
    tableId() {
      if (this.$route.params.id == 8) {
        return 0;
      }
      return this.$route.params.id;
    },
    getClientCount() {
      if (this.ordered) {
        return this.ordered.clientCount;
      }
      return null;
    },
    getDetail() {
      if (this.ordered) {
        return this.ordered.details;
      }
      return null;
    },
  },
  methods: {
    selectedItem(item) {
      this.tabItem = item;
    },
    selected_item(index) {
      this.selected = index;
    },
    remove_item() {
      let index = this.selected;
      if (index != -1) {
        store.dispatch("stollar/minus_count", index).then((response) => {
          this.selected = response;
        });
      } else {
        store
          .dispatch("stollar/clientMinus", index)
          .then((res) => (this.selected = res));
      }
    },
    add_item() {
      let index = this.selected;
      if (index != -1) {
        store.dispatch("stollar/plus_count", index).then((response) => {
          this.selected = response;
        });
      } else {
        store
          .dispatch("stollar/clientAdd", index)
          .then((res) => (this.selected = res));
      }
    },
    order() {
      let getOrder = this.ordered;
      let data = {
        table: getOrder.table,
        client_count: getOrder.clientCount,
        details: [],
      };
      getOrder.details.forEach((item) => {
        data.details.push({
          food: item.food,
          quantity: item.quantity,
        });
      });
      EventService.postOrder(data).then(() => {
        this.dialog = true;
        this.orderMessage = "Zakaz qabul qilindi";
      });
    },
    dialogFalse() {
      let key = parseInt(this.$route.params.id);
      if (key == 8) {
        this.$router.push("/accountant");
      } else {
        this.$router.push("/home");
      }
    },
    back() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.main-menu {
  position: relative;
  margin-top: 20px;
}
.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.tab-wrapper {
  margin-top: 20px;
}
.tab-item {
  color: black !important;
}
.products {
  width: 70%;
  height: calc(100vh - 88px);
  overflow-y: scroll;
}
.ordered-list {
  padding: 10px;
}
.product-name {
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  text-align: center;
}
/* .ordered-list */
.ordered-list {
  width: 30% !important;
  height: calc(100vh - 88px);
  overflow-y: scroll;
}
.product-name span {
  margin-left: 10px;
  color: red;
}
.selected-list {
  height: 75%;
  padding: 5px;
  margin: 0;
  list-style-type: none;
  background-color: #c4c4c4;
  overflow-y: scroll;
}
.selected-item {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
  background-color: #fff;
}
.back-table {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: #fff !important;
}
.changing-buttons {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.active-el {
  background-color: #218838;
  color: #fff;
}
.beetween {
  justify-content: space-between !important;
}
.d-none {
  display: none !important;
}
.buttons {
  display: flex;
  justify-content: center;
}
</style>