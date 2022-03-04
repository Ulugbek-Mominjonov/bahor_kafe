<template>
  <div class="product-wrapper">
    <h2 class="product-name">{{product.name}}</h2>
    <ul class="d-flex product-list">
      <li class="product-item" v-for="(item) in product.foods" :key="item.id" @click="addProduct(item)">
        <span class="cost">{{item.price}}</span>
        <span class="text-capitalize name" :class="{'red': !item.isHave}">{{item.name}}</span>
        <img class="img" :src="item.image" alt="rasm">
      </li>
    </ul>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-alert type="warning">
        Bu mahsulot mavjud emas!!!
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import store from '@/store/index';
  export default {
    props: {
      product: {
        type: Object
      },
      stoll: {
        type: [Number, String]
      },
      category: {
        type: String
      }
    },
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      addProduct(product) {
        if(product.isHave) {
          store.dispatch('stollar/food', product)
        }
        else {
          this.dialog = true
        }
      }
    },
  }
</script>

<style scoped>
.product-name {
  margin-top: 50px;
  margin-bottom: 70px;
  font-size: 25px;
  line-height: 21px;
  text-align: center;
  text-transform: uppercase;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  gap: 30px;
  list-style-type: none;
  justify-content: center;
}
.product-item {
  position: relative;
  width: 200px;
  height: 160px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}
.cost {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 8px;
  background: #C4C4C4;
  border-radius: 2px 0px 0px 2px;
  font-size: 10px;
  line-height: 12px;
  color: #000000;
  z-index: 5;
}
.name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 11px 0;
  background: radial-gradient(100% 2500% at 0% 50%, #C4C4C4 0%, rgba(196, 196, 196, 0.7) 100%);
  text-align: center;
  font-size: 17px;
  line-height: 21px;
  color: black;
  z-index: 5;
}
.img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.red {
  background: none;
  background-color: #F50B0B;
}
@media screen and (max-width: 900px) {
  .product-item {
    width: 180px;
  }
}
@media screen and (max-width: 700px) {
  .product-item {
    width: 200px;
  }
}
</style>