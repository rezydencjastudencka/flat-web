<template>
  <v-dialog v-model="newCharge.isShown" max-width="600px">
    <v-btn flat slot="activator">New Charge</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">
          New {{chargeType}}
        </span>
      </v-card-title>
      <v-card-text>
        <v-form style="padding-left: 30px; padding-right: 30px">
          <v-text-field
            v-model="newRevenue.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="newRevenue.amount"
            label="Amount"
            required
          ></v-text-field>
          <v-flex>
            <v-menu
              :close-on-content-click="false"
              v-model="dateMenu"
              lazy
              right
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="newRevenue.date"
                label="Date"
                hint="YYYY-MM-DD format"
                persistent-hint
              >{{ newRevenue.date }}</v-text-field>
              <v-date-picker v-model="newRevenue.date" no-title @input="dateMenu = false">
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex>
            <v-select
              :loading="$apollo.loading"
              :items="users.map(x => x.username)"
              v-model="newRevenue.checkedUsers"
              label="Select users to debit"
              autocomplete
              multiple
              cache-items
              chips
              required
            ></v-select>
          </v-flex>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="addRevenue(newRevenue, users)">Add</v-btn>
        <v-btn color="primary" flat @click.stop="newCharge.isShown=false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      top
      v-model="showErrorMessage">
      {{ errorMessage }}
      <v-btn flat color="pink" @click.native="showErrorMessage = false">Close</v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag';
import moment from 'moment';

export default {
  name: 'NewCharge',
  props: ['chargeType', 'users[]'],
  apollo: {
    // Query with parameters
    users: {
      // gql query
      query: gql`query {
      users {
        id
        username
      }
    }`,
    },
  },
  data() {
    return {
      newCharge: {
        isShown: false,
      },
      showErrorMessage: false,
      errorMessage: '',
      dateMenu: false,
      users: [],
      newRevenue: {
        name: '',
        amount: '',
        date: moment().format('YYYY-MM-DD'),
        checkedUsers: [],
        toUsers: [],
      },
    };
  },
  methods: {
    addRevenue(newRevenue, users) {
      newRevenue.toUsers = [];
      users.forEach((user) => {
        newRevenue.checkedUsers.forEach((username) => {
          if (user.username === username) {
            newRevenue.toUsers.push(user.id);
          }
        });
      });
      console.log(name);
      this.$apollo.mutate({
        mutation: gql`mutation ($amount: String!, $date: String!, $name: String!, $to: [ID!]) {
        addRevenue(amount: $amount, date: $date, name: $name, to: $to) {
          id
          name
          amount
          rawAmount
          date
          fromUser {
            id
            username
          }
          toUsers {
            id
            username
          }
        }
      }`,
        variables:
          {
            name: newRevenue.name,
            amount: newRevenue.amount,
            date: newRevenue.date,
            to: newRevenue.toUsers,
          },
      }).then(() => {
        this.newCharge.isShown = false;
      }).catch(() => {
        this.showErrorMessage = true;
        this.errorMessage = 'Please set all required fields';
      });
    },
  },
};
</script>

<style scoped>
</style>
