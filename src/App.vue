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
