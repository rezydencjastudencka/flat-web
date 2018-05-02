<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs10 sm6 md4 xl2 pt-5>
        <logo class="mb-5 logo"/>
        <span class="display-3 welcome-message">Welcome to Flat</span>
        <v-card class="elevation-12">
          <v-card-text>
              <v-form>
                <v-text-field
                  label="Username"
                  v-model="username"
                />
                <v-text-field
                  label="Password"
                  v-model="password"
                  :type="'password'"
                />
              </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="primary"
              @click="login"
            >Sign In
            </v-btn>
          </v-card-actions>
          <v-snackbar
            top
            v-model="snackbar">
            {{ text }}
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      error: null,
      snackbar: false,
      text: 'Wrong login or password',
    };
  },
  methods: {
    showErrorMessage() {
      this.$data.snackbar = true;
    },
    async login() {
      try {
        await FlatApi.logIn({
          name: this.username,
          password: this.password,
        }, this.showErrorMessage);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.logo {
  width: 70%;
  margin: 0 auto;
}
.welcome-message {
  margin: 0 auto;
}
</style>
