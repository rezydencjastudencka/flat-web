<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
      <v-data-table
        :headers="headers"
        :items="expenses"
        disable-initial-sort
        hide-actions
        class="elevation-2"
      >
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
      // Static parameters
      variables: {
        year: 2018,
        month: 2,
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
};
</script>

<style scoped>
</style>
