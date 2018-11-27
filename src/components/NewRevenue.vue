<template>
  <v-dialog :value="isShown" @input="changeIsShown" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">
          New {{revenueType}}
        </span>
      </v-card-title>
      <v-card-text>
        <v-form style="padding-left: 30px; padding-right: 30px">
          <v-text-field
            v-model="newRevenue.name"
            label="Name"
            required
          />
          <v-text-field
            v-model="newRevenue.amount"
            label="Amount"
            required
          />
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
              <v-date-picker v-model="newRevenue.date" no-title @input="dateMenu = false"/>
            </v-menu>
          </v-flex>
          <v-flex>
            <v-autocomplete
              :loading="$apollo.loading"
              :items="users ? users.map(x => x.username): []"
              v-model="newRevenue.checkedUsers"
              label="Select users to debit"
              multiple
              cache-items
              chips
              required
            />
          </v-flex>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="addRevenue(newRevenue, users)">Add</v-btn>
        <v-btn color="primary" flat @click.stop="changeIsShown(false)">Cancel</v-btn>
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
  name: 'NewRevenue',
  props: {
    revenueType: {
      type: String,
      required: true,
    },
    isShown: {
      type: Boolean,
      required: true,
    },
  },
  apollo: {
    users: {
      query:
        gql`query {
          users {
            id
            username
          }
        }`,
    },
  },
  data() {
    return {
      showErrorMessage: false,
      errorMessage: '',
      dateMenu: false,
      newRevenue: {
        name: '',
        amount: '',
        date: moment().format('YYYY-MM-DD'),
        checkedUsers: [],
      },
    };
  },
  methods: {
    changeIsShown(value) {
      this.$emit('update:isShown', value);
    },
    addRevenue(newRevenue, users) {
      const toUsers = users
        .filter(user => newRevenue.checkedUsers.includes(user.username))
        .map(user => user.id);
      this.$apollo.mutate({
        mutation:
          gql`mutation ($amount: String!, $date: Date!, $name: String!, $to: [ID!]) {
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
            to: toUsers,
          },
      }).then(() => {
        this.changeIsShown(false);
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
