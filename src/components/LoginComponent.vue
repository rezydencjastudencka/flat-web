<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs10 sm6 md4 xl2 pt-5>
        <logo class="mb-4"/>
        <v-card class="elevation-12">
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
              </v-form>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="primary"
              @click="login"
            >Sign In
            </v-btn>
          </v-card-actions>
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
</style>
