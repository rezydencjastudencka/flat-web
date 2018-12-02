<template>
  <v-dialog :value="isShown" @input="changeIsShown" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">
          New Transfer
        </span>
      </v-card-title>
      <v-card-text>
        <v-form style="padding-left: 30px; padding-right: 30px">
          <v-text-field
            v-model="newTransfer.name"
            label="Name"
            required
          />
          <v-text-field
            v-model="newTransfer.amount"
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
                v-model="newTransfer.date"
                label="Date"
                hint="YYYY-MM-DD format"
                persistent-hint
              >{{ newTransfer.date }}</v-text-field>
              <v-date-picker v-model="newTransfer.date" no-title @input="dateMenu = false"/>
            </v-menu>
          </v-flex>
          <v-flex>
            <v-autocomplete
              :loading="$apollo.loading"
              :items="users ? users.map(x => x.username): []"
              v-model="newTransfer.toUser"
              label="Select users to debit"
              cache-items
              chips
              required
            />
          </v-flex>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="addTransfer(newTransfer, users)">Add</v-btn>
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
      newTransfer: {
        name: '',
        amount: undefined,
        date: moment().format('YYYY-MM-DD'),
        toUser: [],
      },
    };
  },
  methods: {
    changeIsShown(value) {
      this.$emit('update:isShown', value);
    },
    addTransfer(newTransfer, users) {
      const toUser = users
        .filter(user => newTransfer.toUser.includes(user.username))
        .map(user => user.id);
      this.$apollo.mutate({
        mutation:
          gql`mutation ($amount: Float!, $date: Date!, $name: String!, $to: ID!) {
            addTransfer(amount: $amount, date: $date, name: $name, to: $to) {
              id
            }
          }`,
        variables:
          {
            name: newTransfer.name,
            amount: newTransfer.amount,
            date: newTransfer.date,
            to: toUser[0],
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
