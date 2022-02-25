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
    >Afitsant - {{getName}}</v-alert>

    <div class="data-table deatil-data-table">
      <v-data-table
          :headers="headers"
          :items="getAfitsant"
          class="elevation-1"
          light
          no-data-text="Afitsant ma'lumotlari hali kelmadi"
          hide-default-footer
          :search="search"
      >
      </v-data-table> 
    </div>
  </div>
</template>

<script>
import store from '@/store/index';
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'Klientlar soni',
            align: 'start',
            value: 'totalClientCount',
            class: "header-style",
            divider: true
          },
          { text: "Xizmat ko'rsatilgan sana", value: "date", align: 'center', class: "header-style", divider: true},
          { text: "Kunlik Oylik", value: "amount", align: 'center', class: "header-style", divider: true},
          { text: "To'langan oylik", value: "paidAmount", align: 'center', class: "header-style", divider: true},
        ],
      }
    },
    async created() {
      let id = parseInt(this.$route.params.id)
      await store.commit('director/ActiveSideBar')
      await store.dispatch('afitsant/afitsant', id)
    },
    computed: {
      ...mapState('afitsant', {
        afitsant: 'afitsant'
      }),
      getName() {
        if(this.afitsant) {
          return this.afitsant.firstName + " " + this.afitsant.lastName
        }
        return ''
      },
      getAfitsant() {
        if(this.afitsant) {
          let salary = 0;
          let paided = 0;
          let data = this.afitsant.detail
          data.forEach(item => {
            salary += Number(item.amount)
            paided += Number(item.paidAmount)
          })
          data.push({
            totalClientCount: "Umumiy oylik va To'lov",
            amount: salary,
            paidAmount: paided

          })
          return data
        }
        return []
      }, 
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
</style>