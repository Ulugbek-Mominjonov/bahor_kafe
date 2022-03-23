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
      >Ishlatilgan <span class="text-capitalize" style="color: rgb(215 202 202 / 87%); font-weight: bold;">{{ getName }}</span> mahsuloti</v-alert
    >

    <div class="data-table deatil-outcome-data-table">
      <v-data-table
        :headers="headersOutcome"
        :items="getProducts"
        class="elevation-1"
        light
        no-data-text="Bu mahsulotdan hali ishlatilmadi"
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
      headersOutcome: [
        {
          text: "Ishlatilgan sanasi",
          value: "date",
          align: "start",
          class: "header-style",
          divider: true,
        },
        {
          text: "Ishlatilgan Mahsulotlar miqdori",
          align: "center",
          value: "value",
          class: "header-style",
          divider: true,
        },
        {
          text: "Birligi",
          align: "center",
          value: "birligi",
          class: "header-style",
          divider: true,
        },
      ],
    };
  },
  async created() {
    let id = parseInt(this.$route.params.id);
    await store.dispatch("director/product", id);
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
        let data = this.productDetails.productOutcome
        data.forEach(item => {
          item.birligi = this.productDetails.productType
        });
        return this.productDetails.productOutcome;
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