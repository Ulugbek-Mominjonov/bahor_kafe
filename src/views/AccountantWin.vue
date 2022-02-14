<template>
  <div class="d-flex my-container">
    <div class="ordered-foods">
        <div class="d-flex flex-column foods-list">
          <div class="component-info text-center mt-5 mb-3 align-center">
            <h2 class="component-title">"Bahor kafe"</h2>
            <p class="component-text">Bag'dod tumani, Bag'dod shaxarchasi</p>
            <p class="stoll-number">
              <span class="table-number">{{food_list.number}} - stoll</span>
              <span class="table-afitsant">Afitsant: {{food_list.order.waiter}}</span>
            </p>
          </div>
          <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="10"
            class="elevation-1"
            light
          ></v-data-table>
          <div class="d-flex total">
            <p class="total-heading">Umumiy summa</p>
            <p class="total-cost">{{food_list.order.total}}</p>
          </div>
        </div>
        <div class="d-flex justify-space-between my-5 buttons">
            <v-btn class="button" depressed color="primary">
              Chek chiqarish
            </v-btn>
            <v-btn class="button" depressed color="primary">
              Naqd pul orqali to'lash
            </v-btn>
            <v-btn class="button" depressed color="primary">
              Plastik orqali to'lash
            </v-btn>
          </div>
    </div>
    <div class="tables">
      <h1 class="tables-title">Stollar</h1>
      <ul class="table-list">
        <li class="table-item" v-for="table in tables" :key="table.id">{{table.number}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {
            text: 'Nomi',
            align: 'start',
            sortable: false,
            value: 'food_detail.name',
          },
          { text: "Narxi (1ta) (so'm)", value: "food_detail.price" },
          { text: "Miqdori", value: "quantity" },
          { text: "Narxi (so'm)", value: "price" },
        ],
        food_list: {
          "id": 1,
          "number": 1,
          "is_free": false,
          "order": {
            "id": 29,
            "status": "new",
            "waiter": "Ulug'bek Mo'minjonov",
            "total": 30000.0,
            "detail": [
              {
                "food": 3,
                "food_detail": {
                    "name": "Qiyma",
                    "price": 8000.0
                },
                "quantity": "3.0",
                "price": 24000.0
              },
              {
                "food": 2,
                "food_detail": {
                    "name": "Ko'k somsa",
                    "price": 3000.0
                },
                "quantity": "2.0",
                "price": 6000.0
              }
            ]
          }
        },
        tables: [
          {
            "id": 1,
            "number": 1,
            "is_free": false
          },
          {
            "id": 2,
            "number": 2,
            "is_free": true
          },
          {
            "id": 3,
            "number": 2,
            "is_free": true
          },
          {
            "id": 4,
            "number": 2,
            "is_free": true
          },
          {
            "id": 5,
            "number": 2,
            "is_free": true
          },
          {
            "id": 6,
            "number": 2,
            "is_free": true
          },
          {
            "id": 7,
            "number": 2,
            "is_free": true
          },
          {
            "id": 8,
            "number": 2,
            "is_free": true
          },
          {
            "id": 9,
            "number": 2,
            "is_free": true
          },
          {
            "id": 10,
            "number": 2,
            "is_free": true
          },
        ]
      }
    },
    computed: {
      data() {
        return this.food_list.order.detail
      }
    }
    
  }
</script>

<style scoped>
.my-container {
  padding-left: 20px;
  padding-right: 20px;
}
.ordered-foods {
  width: 50%;
}
.foods-list {
  height: calc(100vh - 76px);
  overflow-y: scroll;
}
.stoll-number {
  width: 70%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  color: black;
  font-weight: 500;
}
.total {
  margin-top: auto;
  justify-content: space-between;
  align-items: center;
  padding: 8px 25px;
  background-color: #C4C4C4;
}
.total-heading, .total-cost {
  margin: 0;
  font-size: 16px;
  line-height: 25px;
}
.button {
  font-size: 15px !important;
  text-transform: initial;
}
.tables {
  width: 50%;
  text-align: center;
  height: 100vh;
  overflow-y: scroll;
}
.tables-title {
  margin-top: 20px;
  margin-bottom: 30px;
}
.table-list {
  width: 100%;
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  align-items: center;
  list-style-type: none;
  gap: 2%;
}
.table-item {
  width: 32%;
  font-weight: 800;
  font-size: 60px;
  line-height: 120px;
  margin-bottom: 2%;
  color: #000000;
  background: rgba(20, 255, 0, 0.5);
  border-radius: 20px;
  text-align: center;
}
</style>