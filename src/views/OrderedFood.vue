<template>
  <div class="my-container">
    <div class="component-info text-center mt-5 mb-3">
      <h2 class="component-title">"Bahor kafe"</h2>
      <p class="component-text">Bag'dod tumani, Bag'dod shaxarchasi</p>
      <p class="stoll-number">{{orderedList.stoll_nomer}} - stoll</p>
    </div>
    <v-data-table
    :headers="headers"
    :items="foods"
    :items-per-page="5"
    class="elevation-1"
    light
    ></v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: "Narxi (1ta) (so'm)", value: "cost" },
          { text: "Miqdori", value: "count" },
          { text: "Narxi (so'm)", value: "summ" },
        ],
      }
    },
    created() {
       
    },
    computed: {
      ...mapState({
        orderedList: 'orderedList'
      }),
      foods() {
        let data = []
        let AllSumm = 0
        console.log(this.orderedList.product);
        if(this.orderedList.product) {
          this.orderedList.product.forEach(element => {
            data.push({
              name: element.name,
              cost: element.cost,
              count: element.count,
              summ: element.cost*element.count
            })
            AllSumm += element.cost*element.count
          });
          data.push({
            name: "Umumiy summa",
            summ: AllSumm
          })
        }
        return data
      }

    }
  }
</script>

<style scoped>

</style>