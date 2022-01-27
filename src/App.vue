<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  
  .my-container {
    width: 100%;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 45px;
    padding-right: 45px;
  }
  .link {
    text-decoration: none;
  }
</style>
