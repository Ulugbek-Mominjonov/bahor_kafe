<template>
    <div class="my-container stollar">
      <h1 class=afitsant>Afitsant: <span>{{$route.params.id }}</span></h1>
      <p class="stoll">Stollar</p>
      <ul class="stoll-list">
        <li v-for="item in nomer" :key="item">
          <router-link class="link" to="#">
            <Stollar :nomer="item"/>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
import Stollar from "../components/Stollar";

export default {
  name: "Home",
  components: {
    Stollar,
  },
  data() {
    return {
      nomer: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      afitsant: ""
    }
  },
  created() {
    this.afitsant = this.$route.params.id 
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
</style>
