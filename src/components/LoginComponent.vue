<template>
  <div>
    <v-container fluid fill-height>
      <v-layout py-5 mx-5 row wrap>
        <v-flex xs6>
          <logo class="ml-5 logo"/>
          <span class="display-3 welcome-message">Welcome to Flat</span>
        </v-flex>
        <v-flex>
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
        });
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
.logo {
  width: 400px;
  margin: 0 auto;
}
.welcome-message {
  margin: 0 auto;
}
</style>
