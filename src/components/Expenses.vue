<template>
  <v-container>
    <v-layout><DatePicker v-on:picked-date-change="onPickedDateChange"/></v-layout>
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
import DatePicker from '@/components/DatePicker';

export default {
  name: 'expenses',
  components: { DatePicker },
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
          year: this.$store.state.date.year(),
          month: this.$store.state.date.month() + 1,
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
    };
  },
  methods: {
    onPickedDateChange(date) {
      this.$store.commit('setDate', date);
    },
  },
};
</script>

<style scoped>
</style>
