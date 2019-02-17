<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md10>
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
          <td>{{ props.item.category ? props.item.category.name : ""}}</td>
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
import { pollInterval } from '@/constants';
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
        category {
          id
          name
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
    pollInterval,
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Category', value: 'category', align: 'left' },
        { text: 'Amount', value: 'amount', align: 'right' },
        { text: 'Date', value: 'date', align: 'right' },
        { text: 'From', value: 'from', align: 'right' },
      ],
      expenses: [],
    };
  },
};
</script>

<style scoped>
</style>
