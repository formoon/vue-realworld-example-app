<template>
  <div class="auth-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">R&D communication board</h1>
        <p>Share your idea, Share your work.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form @submit.prevent="onSubmit(email, password)">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions.type";

export default {
  name: "RwvLogin",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "home" }));
    }
  },
  /*
  keyupSubmit() {
    document.onkeydown = e => {
      console.log("测试什么时候调用的:" + e);
      let _key = window.event.keyCode;
      if (_key === 13) {
        this.onSubmit(this.email, this.password);
      }
    };
  }, */
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
    /*
    errors(){
        return this.$store.state.auth.errors;
      },
    */
  }
};
</script>
