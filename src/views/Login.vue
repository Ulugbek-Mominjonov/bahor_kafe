<template>
  <div class="Login">
    <v-form class="form">
      <v-text-field
        label="Login"
        prepend-icon="mdi-login"
        v-model="login"
      ></v-text-field>
      <v-text-field
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        v-model="parol"
      ></v-text-field>
      <v-btn color="info" class="btn" @click.prevent="sign_in">
        Login
        <v-icon class="ml-1">mdi-login</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      showPassword: false,
      login: null,
      parol: null,
    };
  },
  created() {
    store.commit("director/DisabledSideBar");
  },
  computed: {
    ...mapGetters("auth", {
      getterLoginStatus: "getLoginStatus",
      getterAuthData: "getAuthData",
    }),
  },
  methods: {
    async sign_in() {
      let data = { username: this.login, password: this.parol };
      await store
        .dispatch("auth/login", data)
        .then(() => {
          if (this.getterAuthData.role == "waiter") {
            store.commit("director/DisabledSideBar");
            this.$router.push({
              name: "Home",
              params: { id: this.getterAuthData.fullName },
            });
          } else if (this.getterAuthData.role == "cashier") {
            store.commit("director/DisabledSideBar");
            this.$router.push("/accountant");
          } else if (this.getterAuthData.role == "director") {
            store.commit("director/ActiveSideBar");
            this.$router.push("/director");
          } else if (this.getterAuthData.role == "chef") {
            this.$router.push("/chef");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Noto'gri malumot");
        });
    },
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
