<template>
<div>
  <input
  type="text"
  name="username"
  v-model="username"
  placeholder="Username"/>
  <br>
  <input
    type="password"
    name="password"
    v-model="password"
    placeholder="Password"/>
  <br>
  <button
    @click="login">Sign In</button>
</div>
</template>

<script>
import FlatApi from '@/services/FlatApi';

export default {
  name: 'login-component',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await FlatApi.logIn({
          name: this.username,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>

</style>
