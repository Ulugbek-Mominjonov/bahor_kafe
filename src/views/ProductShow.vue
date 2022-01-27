<template>
  <div class="my-container">
    <v-card class="tab-wrapper">
      <v-tabs
        center-active
      >
        <v-tab class="tab-item" v-for="(tab, index) in Alldata" :key="index"  @click="selectedItem(tab.category)">{{tab.category }}</v-tab>
      </v-tabs>
    </v-card>
    <div class="main-menu d-flex">
      <div class="products">
        <Product v-for="(item, index) in Alldata" :key="index" :product="item" v-show="tabItem == item.category"/>
        <br>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quibusdam, consectetur atque ducimus illum quasi eius aperiam dolore? Eos fuga cumque consectetur culpa autem repudiandae vero sequi vitae minus repellat numquam in nam, cum eum saepe ipsa nesciunt dolore aliquam eius possimus labore sed. Totam aut vero veritatis libero excepturi vitae perspiciatis repellendus beatae eum ad ab nobis non dolorum, id quam saepe dolore animi soluta dolores ex tempore dolor ea. Recusandae aspernatur optio, dolorem dicta laborum quam quia. Eos, adipisci porro voluptate, laudantium voluptatem itaque quas iste quaerat id animi reprehenderit sit corporis delectus ad, expedita quis voluptatum autem.
      </div>
      <div class="ordered-list">
        <h2 class="product-name">Zakalar ro'yhati <span>{{$route.params.id }}</span> - stoll</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue';
  export default {
    components: {
      Product
    },
    data() {
      return {
        Alldata: [
          {
            category: "Nonlar",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Choylar",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Ichimliklar",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Fast Food",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Pitsa",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Salatlar",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Coffe",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Somsa",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Ovqatlar",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
          {
            category: "Sharbatlar",
            products: [
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Kulcha non",
                cost: 300
              },
              {
                id: 2,
                name: "Malda non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
            ]
          },
        ],
        tabItem: "Nonlar"
      }
    },
    methods: {
      selectedItem(item) {
        this.tabItem = item
      }
    }
  }
</script>

<style scoped>
.main-menu {
  margin-top: 20px;
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
  
}
</style>