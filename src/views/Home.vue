<template>
    <div class="my-container stollar">
      <h1 class=afitsant>Afitsant: <span>{{$route.params.id }}</span></h1>
      <p class="stoll">Stollar</p>
      <ul class="stoll-list">
        <li v-for="(item, index) in stollar" :key="index">
          <Stollar :nomer="item" :afitsant="c"/>
        </li>
      </ul>
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
      afitsant: ""
    }
  },
  created() {
    store.dispatch('stollar/table')
  },
  computed: {
    ...mapState('stollar', {
      stollar: 'table',
    })
  },
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
</style>
