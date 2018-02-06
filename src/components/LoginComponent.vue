<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-space-between>
      <v-flex xs4 offset-xs4>
        <v-card color="white" class="text--darken-1">
          <v-card-text>
            <v-flex xs12>
            <v-form v-model="valid">
              <v-text-field
                label="Username"
                v-model="username"
              />
              <v-text-field
                label="Password"
                v-model="password"
                :type="'password'"
              />
              <div class="signInButton">
                <v-btn
                  block
                  color="blue-grey lighten-1"
                  @click="login"
                  >Sign In
                </v-btn>
              </div>
            </v-form>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
        await FlatApi.logIn({
          name: this.username,
          password: this.password,
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.signInButton{
  padding: 25px;
}

</style>
