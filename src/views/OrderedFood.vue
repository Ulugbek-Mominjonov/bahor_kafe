<template>
  <div class="my-container">
    <div class="component-info text-center mt-5 mb-3">
      <h2 class="component-title">"Bahor kafe"</h2>
      <p class="component-text">Bag'dod tumani, Bag'dod shaxarchasi</p>
      <p class="stoll-number">{{ordered.number}} - stoll</p>
    </div>
    <v-data-table
    :headers="headers"
    :items="foods"
    :items-per-page="5"
    class="elevation-1"
    @click:row="foo"
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
            class: 'header-class'
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
      ...mapState('stollar',{
        ordered: 'ordered'
      }),
      foods() {
        let data = []
        if(this.ordered.order) {
          this.ordered.order.detail.forEach(element => {
            data.push({
              name: element.foodDetail.name,
              cost: element.foodDetail.price,
              count: parseInt(element.quantity),
              summ: element.price,
            })
          });
          data.push({
            "name": "Umumiy summa",
            "summ": parseInt(this.ordered.order.total)
          })
          data.unshift({
            name: "Klentlar soni",
            cost: 1000,
            count: this.ordered.order.clientCount,
            summ: this.ordered.order.clientCost
          })
        }
        return data
      }

    },
    methods: {
      foo(e) {
        console.log(e);
      }
    }
  }
</script>

<style scoped>

</style>