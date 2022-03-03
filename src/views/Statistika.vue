<template>
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
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modaltwo = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialogtwo.save(date)"
          >
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
        <v-date-picker
          v-model="dateTwo"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modalThree = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="setDate('toFrom')"
          >
            OK
          </v-btn>
        </v-date-picker>
        </v-dialog>
      </div>
      <v-btn color="warning" dark outlined @click="changeChart()">Umumiy Foyda</v-btn>
    </div>
    <v-card class="tab-wrapper mb-5">
      <v-tabs
        center-active
      >
        <v-tab class="tab-item" v-for="(tab, index) in allCategory" :key="index"  @click="selectedItem(tab.id)">{{tab.name }}</v-tab>
        <v-tab class="tab-item" @click="selectedItem('Barchasi')">Barchasi</v-tab>
      </v-tabs>
    </v-card>
    <!-- chart  -->
    <Chart :chartData="chartData" v-if="chartData ? true : false" class="my-5"/>
    <!-- all  -->
  </div>
</template>

<script>
import store from '@/store/index';
import { mapState } from 'vuex';
import { DateTime } from "luxon";
import Chart from '@/components/Chart.vue';
import colors from '@/colors.js';
  export default {
    components: { Chart },
    data() {
      return {
        search: '',
        date: '',
        dateTwo: '',
        modaltwo: false,
        modalThree: false,
        toggle_exclusive: undefined,
        tabItem: "Barchasi",
      }
    },
    mounted() {
      store.commit('director/ActiveSideBar')
      store.dispatch('statistika/category')
      if(localStorage.getItem('foodId') != 'Barchasi'){
        if(localStorage.getItem('current') && localStorage.getItem('last')) {
          store.dispatch('statistika/getFilter')
        }
        else {
          store.dispatch('statistika/getCategory', localStorage.getItem('foodId'))
        }
      }
      else {
        if(localStorage.getItem('current') && localStorage.getItem('last')) {
          store.dispatch('statistika/getFilterDate')
        }
        else {
          store.dispatch('statistika/foods')
        }
      }
    },
    computed: {
      ...mapState('statistika', {
        allCategory: 'allCategory',
        foods: 'allFoods',
      }),
      chartData() {
        if(this.foods) {
          let arr = this.foods.slice()
          let datas = {
            type: "line",
            data: {
              labels: [],
              datasets: []
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Foyda vaqt oraligida"
                }
              }
            }
          }
          let maxLabel = arr[0].dates.length
          let myIndex = 0
          arr.forEach((item,index) => {
            if(maxLabel < item.dates.length) {
              myIndex = index
              maxLabel = item.dates.length
            }
          })
          arr.forEach((item, index) => {
            if(item.profitMoneys.length < maxLabel) {
              for(let i = 1; i <= maxLabel-item.profitMoneys.length; i++) {
                item.profitMoneys.unshift(0)
              }
            }
            datas.data.datasets.push({
              label: item.name,
              data: item.profitMoneys,
              backgroundColor: "transparent",
              borderColor: `${colors.randomColor(index)}`,
              borderWidth: 3
            })
          })
          datas.data.labels = arr[myIndex].dates
          return datas
        }
        return null
      },
    },
    methods: {
      selectedItem(payload) {
        this.tabItem = payload
        localStorage.setItem('foodId', payload)
        localStorage.removeItem('last')
        localStorage.removeItem('current')
        location.reload()
      },
      foo() {
        this.modal = true
      },
      setDate() {
        let current = DateTime.now().toISODate()
        let last = undefined
        last = this.date
        current = this.dateTwo
        this.modalThree = false
        localStorage.setItem('current', current)
        localStorage.setItem('last', last)
        location.reload()
      }, 
      changeChart() {
        this.$router.push('/statistikaAll')
      }
    },
    destroyed() {
      localStorage.removeItem('last')
      localStorage.removeItem('current')
      localStorage.removeItem('foodId')
    }
  }
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
  border: 1px solid #4B6B75;
  border-radius: 40px;
  color: white;
}
::placeholder{
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
.tab-button:not(:last-child){
  margin-right: 20px;
}
.tab-button {
  padding: 15px 32px;
  border: 1px solid #006D7C;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #006D7C;
}
.actives {
  background-color: #006D7C;
  color: #FFFFFF;
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