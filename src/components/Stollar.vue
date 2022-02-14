<template>
  <router-link class="link stoll-link" :to="{name: 'Menu', params: {id: nomer.id}}">
    <div 
      class="stoll"
      :class="{active: !nomer.isFree}">{{nomer.number}}</div>
  </router-link>
</template>

<script>
  export default {
    props: {
      nomer: {
        type: Object,
      },
      afitsant: {
        type: String
      },
    },
  }
</script>

<style scoped>
.stoll {
  width: 184px;
  padding: 46px 36px;
  font-weight: 800;
  font-size: 96px;
  line-height: 112px;
  color: #000000;
  background: rgba(20, 255, 0, 0.5);
  border-radius: 20px;
  text-align: center;
}
.stoll-link {
  display: block;
}
.active{
  background-color: red;
}

</style>