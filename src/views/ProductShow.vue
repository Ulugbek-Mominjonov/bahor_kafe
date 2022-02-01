<template>
  <div class="my-container">
    <v-card class="tab-wrapper">
      <v-tabs
        center-active
      >
        <v-tab class="tab-item" v-for="(tab, index) in Alldata" :key="index"  @click="selectedItem(tab.category)">{{tab.category }}</v-tab>
        <v-tab class="tab-item" @click="selectedItem('Barchasi')">Barchasi</v-tab>
      </v-tabs>
    </v-card>
    <div class="main-menu d-flex">
      <div class="products">
          <Product v-for="(item, index) in Alldata" :key="index" :product="item" :stoll="$route.params.id" v-show="tabItem == item.category"/>
          <template v-if="tabItem == 'Barchasi'">
            <Product v-for="(item, index) in Alldata" :key="index" :product="item" :stoll="$route.params.id" />
          </template>
        <br>
      </div>
      <div class="ordered-list">
        <h2 class="product-name">Zakalar ro'yhati <span>{{$route.params.id }} - stoll</span></h2>
        <ul class="selected-list">
          <li class="selected-item">
            <span class="left-col">Nomi</span>
            <span class="rigth-col">Soni</span>
          </li>
          <li class="selected-item" v-for="(item, index) in getStateById($route.params.id).product" :key="index" @click="selected_item(index)" :class="{'active-el': selected==index ? true : false}"> 
            <span class="left-col">{{item.name}}</span>
            <span class="rigth-col">{{item.count}}</span>
          </li>
        </ul>

        <div class="d-flex justify-space-between my-5 changing-buttons">
          <v-btn
            class="minus-btn"
            dark
            color="error"
            :disabled="selected==null ? true : false"
            @click="remove_item($route.params.id)"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>

          <v-btn
            class="plus-btn"
            dark
            color="indigo"
            :disabled="selected==null ? true : false"
            @click="add_item($route.params.id)"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>

        <div class="d-flex justify-center mb-5">
          <v-btn
            class="order-btn"
            dark
            color="success"
            @click="order($route.params.id)"
          >
            Zakaz berish
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue';
import { mapState, mapGetters } from 'vuex';
import store from '@/store/index';
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
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
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
                name: "Ko'k choy",
                cost: 300
              },
              {
                id: 2,
                name: "Qora choy",
                cost: 300
              },
              {
                id: 2,
                name: "Limonli choy",
                cost: 300
              },
              {
                id: 2,
                name: "Mevali choy",
                cost: 300
              },
              {
                id: 2,
                name: "Mevali choy",
                cost: 300
              },
              {
                id: 2,
                name: "Mevali choy",
                cost: 300
              },
            ]
          },
          {
            category: "Ichimliklar",
            products: [
              {
                id: 2,
                name: "Fanta",
                cost: 300
              },
              {
                id: 2,
                name: "Cola",
                cost: 300
              },
              {
                id: 2,
                name: "Pepsi",
                cost: 300
              },
              {
                id: 2,
                name: "Dinay",
                cost: 300
              },
              {
                id: 2,
                name: "Dinay",
                cost: 300
              },
              {
                id: 2,
                name: "Dinay",
                cost: 300
              },
              {
                id: 2,
                name: "Dinay",
                cost: 300
              },
              {
                id: 2,
                name: "Dinay",
                cost: 300
              },
              {
                id: 2,
                name: "Dinay",
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
                name: "Goshtli",
                cost: 300
              },
              {
                id: 2,
                name: "Tuqumli",
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
              {
                id: 2,
                name: "Tuqumli",
                cost: 300
              },
              {
                id: 2,
                name: "Tuqumli",
                cost: 300
              },
            ]
          },
          {
            category: "Salatlar",
            products: [
              {
                id: 2,
                name: "Sezar",
                cost: 300
              },
              {
                id: 2,
                name: "Aliviya",
                cost: 300
              },
              {
                id: 2,
                name: "Pigudi",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Pigudi",
                cost: 300
              },
              {
                id: 2,
                name: "Pigudi",
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
                name: "Qovoqli",
                cost: 300
              },
              {
                id: 2,
                name: "Goshtli",
                cost: 300
              },
              {
                id: 2,
                name: "Kartoshkali",
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
              {
                id: 2,
                name: "Obi non",
                cost: 300
              },
              {
                id: 2,
                name: "Obi non",
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
        tabItem: "Nonlar",
        selected: null
      }
    },
    beforeRouteEnter(to, from, next) {
      store.commit('SET_ACTIVE', to.params.id)
      next()
    },
    computed: {
      ...mapGetters(['getStateById']),
      ...mapState({
        selectedProducts: 'selectedProducts'
      })
    },
    methods: {
      selectedItem(item) {
        this.tabItem = item
      },
      selected_item(index) {
        this.selected = index
      },
      remove_item(pay) {
        let index = this.selected
        let data = {
          pay, 
          index
        }
        store.dispatch('minus_count', data).then (response => {
          this.selected = response;
        })
      },
      add_item(pay) {
        let index = this.selected
        let data = {
          pay, 
          index
        }
        store.dispatch('plus_count', data).then (response => {
          this.selected = response;
        })
      },
      order(value) {
        store.dispatch('oderedList', value)
          .then(() => {
            this.$router.push({name: 'OrderedFood'})
          })
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
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  text-align: center;
}
/* .ordered-list */
.ordered-list {
  width: 30% !important;
  height: calc(100vh - 88px);
}
.product-name span {
  margin-left: 10px;
  color: red
}
.selected-list {
  height: 75%;
  padding: 5px;
  margin: 0;
  list-style-type: none;
  background-color: #C4C4C4;
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
.changing-buttons {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.active-el {
  background-color: #218838;
  color: #fff;
}
</style>