<template>
  <v-container>
    <v-dialog v-model="datePicker.isShown" persistent max-width="290">
      <v-btn color="primary" dark slot="activator">Pick month</v-btn>
      <v-card>
        <v-date-picker ref="picker" v-model="datePicker.date" type="month"></v-date-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="datePicker.isShown = false">Cancel</v-btn>
          <v-btn color="primary" flat @click.native=setDateToQueryVariables()>Set</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
      <v-data-table
        :headers="headers"
        :items="expenses"
        :loading="$apollo.loading"
        disable-initial-sort
        hide-actions
        class="elevation-2"
      >
        <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.amount }}</td>
          <td class="text-xs-right">{{ props.item.date }}</td>
          <td class="text-xs-right">{{ props.item.fromUser.username }}</td>
        </template>
      </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';
import moment from 'moment';

export default {
  name: 'expenses',
  apollo: {
    // Query with parameters
    expenses: {
      // gql query
      query: gql`query expenses($year: Int!, $month: Int!) {
      expenses(year: $year, month: $month) {
        amount
        date
        name
        fromUser {
          username
        }
      }
    }`,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          year: this.selectedDate.year(),
          month: this.selectedDate.month() + 1,
        };
      },
    },
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date', value: 'date' },
        { text: 'From', value: 'from' },
      ],
      expenses: [],
      datePicker: {
        isShown: false,
        date: null,
      },
      selectedDate: moment(),
    };
  },
  methods: {
    setDateToQueryVariables() {
      this.selectedDate = moment(this.datePicker.date, 'YYYY-MM');
      this.datePicker.isShown = false;
    },
  },
};
</script>

<style scoped>
</style>
