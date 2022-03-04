<template>
    <div class="my-container stollar">
      <h1 class=afitsant>Afitsant: <span>{{ getAfitsant }}</span></h1>
      <p class="stoll">Stollar</p>
      <ul class="stoll-list">
        <li v-for="(item, index) in getStollar" :key="index">
          <Stollar :nomer="item" :afitsant="$route.params.id"/>
        </li>
      </ul>
      <v-btn color="warning" class="logout" @click="logOut">Chiqish</v-btn>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Stollar from "../components/Stollar";
import store from '@/store/index';
export default {
  name: "Home",
  components: {
    Stollar,
  },
  data() {
    return {
      afitsant: "",
      dialog: true
    }
  },
  created() {
    store.dispatch('stollar/table')
  },
  computed: {
    ...mapState('stollar', {
      stollar: 'table',
    }),
    getStollar() {
      if(this.stollar) {
        let data = this.stollar.slice()
        data.shift()
        return data
      }
      return []
    },
    getAfitsant() {
      return localStorage.getItem('fullName')
    }
  },
  methods: {
    logOut() {
      store.commit('auth/clear_data')
      location.reload()
    },
  }
};
</script>
<style scoped>
.afitsant, .stoll {
  text-align: center;
}
.stoll-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 45px;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.logout {
  position: fixed !important;
  top: 10px;
  left: 15px;
  padding: 15px !important;
}
@media screen and (max-width: 800px) {
  .logout {
    top: 44px;
    left: 0;
  }
  .afitsant {
    margin-bottom: 15px;
  }
}
</style>
