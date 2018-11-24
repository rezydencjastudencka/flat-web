<template>
  <div>
    <v-toolbar>
      <v-spacer></v-spacer>
      <logo class="logo"/>
      <v-toolbar-title>Flat</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 mt-5>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Sign in</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                  v-model="username"/>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="password"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
            <v-snackbar
              top
              v-model="showErrorMessage">
              {{ errorMessage }}
              <v-btn flat color="pink" @click.native="showErrorMessage = false">Close</v-btn>
            </v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FlatApi from '@/services/FlatApi';
import Logo from '@/components/Logo';

export default {
  name: 'login-component',
  components: {
    logo: Logo,
  },
  data() {
    return {
      username: '',
      password: '',
      showErrorMessage: false,
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        await FlatApi.logIn({
          name: this.username,
          password: this.password,
        }, this.$route.query.next || '/');
      } catch (e) {
        if (e instanceof FlatApi.WrongCredentialsException) {
          this.errorMessage = 'Wrong login or password';
          this.$data.showErrorMessage = true;
        } else if (e instanceof FlatApi.SomethingWentWrongException) {
          this.errorMessage = 'Something went wrong';
          this.$data.showErrorMessage = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.logo{
  height: 2em;
  width: 2em;
}
</style>
