<template>
  <div class="main">
    <div class="header">
      <div class="search-wrapper">
        <input type="text" v-model="search" class="search" placeholder="search">
        <v-icon dark class="icon">mdi-magnify</v-icon>
      </div>
    </div>

    <v-alert
      type="success"
      color="#006D7C"
      class="alert"
    >Afitsantlar ma'lumoti</v-alert>

    <div class="data-table deatil-data-table">
      <v-data-table
          :headers="headers"
          :items="getAfitsants"
          class="elevation-1"
          light
          no-data-text="Afitsantlar ro'yhati hali mavjud emas!!!"
          hide-default-footer
          :search="search"
          @click:row="handleClick"
      >
      </v-data-table> 
    </div>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2">
            Afitsant <span class="name">{{getName}}</span>
          </v-card-title>

          <v-card-text>
            <v-text-field
            label="Amount"
            v-model="payment"
            autofocus
            type="number"
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="warning"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="pay()"
            >
              To'lash
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import store from '@/store/index';
import { mapState } from 'vuex';
import EventService from '@/services/EventServices.js'
  export default {
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'Afitsantlar F.I.SH',
            align: 'start',
            value: 'name',
            class: "header-style",
            divider: true
          },
          { text: "Zakazlar soni", value: "orderCount", align: 'center', class: "header-style", divider: true},
          { text: "Klientlar soni", value: "clientCount", align: 'center', class: "header-style", divider: true},
          { text: "Oylik(so'm)", value: "amount", align: 'center', class: "header-style", divider: true},
          { text: "To'langan oylik(so'm)", value: "paidAmount", align: 'center', class: "header-style", divider: true},
        ],
        afitsant: {},
        dialog: false,
        payment: 0
      }
    },
    created() {
      store.dispatch('cashier/afitsants')
    },
    mounted() {
      store.commit('cashier/ACTIVE_SIDEBAR')
    },
    computed: {
      ...mapState('cashier', {
        afitsants: 'afitsants'
      }),
      getName() {
        return this.afitsant.name
      },
      getAfitsants() {
        if(this.afitsants) {
          let oylik = 0
          let paided = 0 
          let data = this.afitsants
          data.forEach(item => {
            item.name = item.firstName + " " + item.lastName
            oylik += Number(item.amount)
            paided += Number(item.paidAmount)
          })
          data.push({
            name: "Ummiy to'langan va to'lanmagan oylik",
            amount: oylik,
            paidAmount: paided
          })
          return data
        }
        return []
      }
    },
    methods: {
      handleClick(value) {
        this.afitsant = value
        this.dialog = true
        this.payment = value.amount
      },
      async pay() {
        let id = this.afitsant.waiterId
        let amount = this.payment
        let data = {
          waiter: id,
          amount: amount
      }
      await EventService.setPayment(data)
        .then(() => {
          location.reload()
          this.dialog = false
        })
      }
    },
    destroyed() {
      store.commit('cashier/DISABLED_SIDEBAR')
    }
  }
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
.data-table {
  padding-left: 40px;
  padding-right: 40px;
}
.alert {
  width: 40% !important;
  margin: 20px auto;
  text-align: center;
}
.name {
  margin-left: 5px;
  color: #fb8c00;
}
</style>