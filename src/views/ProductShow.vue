<template>
  <div class="my-container">
    <template v-if="!notEnter">
      <v-card class="tab-wrapper">
        <v-tabs center-active>
          <v-tab class="tab-item" @click="selectedItem('Barchasi')"
            >Barchasi</v-tab
          >
          <v-tab
            class="tab-item"
            v-for="(tab, index) in allFoods"
            :key="index"
            @click="selectedItem(tab.name)"
            >{{ tab.name }}</v-tab
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
          <h2 class="product-name text-center">
            Zakalar ro'yhati
            <span class="d-block d-md-inline-block text-center"
              >{{ tableId }} - stol</span
            >
          </h2>
          <ul class="selected-list" ref="list">
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
              class="minus-btn py-5 px-6"
              dark
              color="error"
              :disabled="selected == null ? true : false"
              @click="remove_item()"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>

            <v-btn
              class="plus-btn py-5"
              dark
              color="indigo"
              :disabled="selected == null ? true : false"
              @click="add_item()"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </div>

          <div
            class="mb-5 buttons flex-wrap justify-center justify-md-between"
            :class="{ beetween: !isActive }"
          >
            <v-btn
              class="order-btn mb-5 mr-3 py-5"
              dark
              color="success"
              @click="order()"
            >
              Zakaz berish
            </v-btn>
            <v-btn
              class="order-btn mb-5 py-5"
              :class="{ 'd-none': isActive }"
              dark
              color="red"
              outlined
              @click="cancel()"
            >
              Bekor qilish
              <v-icon dark right> mdi-cancel </v-icon>
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
            <v-btn color="primary" text @click="submit()"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
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
    store.dispatch("stollar/detail", key).catch((error) => {
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
      return this.ordered.table;
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
    isActive() {
      if (this.ordered && this.ordered.id) {
        return false;
      }
      return true;
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
      store.dispatch("stollar/setOrder", data);
      let key = parseInt(this.$route.params.id);
      if (key == 8) {
        this.$router.push("/accountant");
      } else {
        store.dispatch("stollar/detail", key).then(() => {
          this.dialog = true;
          this.orderMessage = "Zakaz qabul qilindi";
        });
      }
    },
    back() {
      this.$router.push("/home");
    },
    cancel() {
      store.dispatch("stollar/deleteOrders").then(() => {
        this.orderMessage = "Zakaz bekor qilindi!";
        this.dialog = true;
      });
    },
    submit() {
      this.$router.push("/home");
      this.dialog = false;
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
@media screen and (max-width: 1100px) {
  .products {
    width: 65%;
  }
  .ordered-list {
    flex-grow: 1;
  }
}
@media screen and (max-width: 1000px) {
  .ordered-list .order-btn {
    margin-right: 0 !important;
    width: 90%;
  }
}
@media screen and (max-width: 900px) {
  .products {
    width: 60%;
  }
  .product-item {
    width: 180px !important;
  }
}
@media screen and (max-width: 700px) {
  .products {
    width: 50%;
  }
}
</style>