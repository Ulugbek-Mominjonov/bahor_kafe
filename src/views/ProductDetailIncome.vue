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
    </div>

    <v-alert type="success" color="#006D7C" class="alert"
      >Kelgan <span class="text-capitalize" style="color: rgb(215 202 202 / 87%); font-weight: bold;">{{ getName }}</span> mahsulot</v-alert
    >

    <div class="data-table deatil-data-table">
      <v-data-table
        :headers="headersIncome"
        :items="getProducts"
        class="elevation-1"
        light
        no-data-text="Mahsulotlar hali kelmadi"
        hide-default-footer
        :search="search"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      headersIncome: [
        {
          text: "Kelgan Mahsulotlar miqddori",
          align: "start",
          value: "value",
          class: "header-style",
          divider: true,
        },
        {
          text: "Narx 1 ta(so'm)",
          value: "onePrice",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "Umumiy narx (so'm)",
          value: "price",
          align: "center",
          class: "header-style",
          divider: true,
        },
        {
          text: "Kirim sanasi",
          value: "date",
          align: "center",
          class: "header-style",
          divider: true,
        },
      ],
    };
  },
  created() {
    let id = parseInt(this.$route.params.id);
    store.dispatch("director/product", id);
  },
  mounted() {
    store.commit("director/ActiveSideBar");
  },
  computed: {
    ...mapState("director", {
      productDetails: "productDetail",
    }),
    getName() {
      if (this.productDetails) {
        return this.productDetails.name;
      }
      return "";
    },
    getProducts() {
      if (this.productDetails) {
        let summ = 0;
        let data = this.productDetails.productIncome;
        data.forEach((item) => {
          item.onePrice = parseInt(item.price)/parseInt(item.value)
          item.value += ` ${this.productDetails.productType}`
          summ += Number(item.price);
        });
        data.push({
          value: "Ummiy sarflangan pull",
          price: summ,
        });
        return data;
      }
      return [];
    },
  },
};
</script>

<style scoped>
.main {
  flex-grow: 1;
}
.header {
  display: flex;
  justify-content: center;
  background-color: #052129;
  padding-top: 10px;
  padding-bottom: 10px;
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
.data-table {
  padding-left: 40px;
  padding-right: 40px;
}
.alert {
  width: 40% !important;
  margin: 20px auto;
  text-align: center;
}
</style>