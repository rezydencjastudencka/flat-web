<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Expenses</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="expenses"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.amount }}</td>
          <td class="text-xs-right">{{ props.item.date }}</td>
          <td class="text-xs-right">{{ props.item.fromUser.username }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'expenses-list',
  apollo: {
    expenses: gql`{
      expenses(year: 2018, month: 2) {
        amount
        date
        name
        fromUser {
          username
        }
      }
    }`,
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
