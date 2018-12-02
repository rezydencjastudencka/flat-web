<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md6>
        <v-data-table
          :headers="headers"
          :items="summary.monthly"
          :loading="$apollo.loading"
          disable-initial-sort
          hide-actions
          class="elevation-2"
        >
          <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.user.username }}</td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'summary',
  apollo: {
    summary: {
      query:
        gql`query summary($year: Int!, $month: Int!) {
          summary {
            monthly(year: $year, month: $month) {
              amount
              user {
                id
                username
              }
            }
          }
        }`,
      variables() {
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
        { text: 'Username', value: 'user.username', align: 'left' },
        { text: 'Amount', value: 'amount', align: 'right' },
      ],
    };
  },
};
</script>

<style scoped>
</style>
