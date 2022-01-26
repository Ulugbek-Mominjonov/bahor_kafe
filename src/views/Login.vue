<template>
  <div class="Login">
    <v-form class="form">
      <v-text-field
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        v-model="login"
      ></v-text-field>
      <v-btn color="info" class="btn" @click.prevent="signIn">
        Login
        <v-icon class="ml-1">mdi-login</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      showPassword: false,
      login: null,
    };
  },
  methods: {
    signIn() {
       this.$router.push({ name: "Home", params: {id: this.login} });
    }
  },
};
</script>
<style scoped>
.Login {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.form {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  top: 25%;
  left: 25%;
}
.btn {
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
