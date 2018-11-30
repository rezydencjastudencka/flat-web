<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-data-table
          :headers="headers"
          :items="transfers"
          :loading="$apollo.loading"
          disable-initial-sort
          hide-actions
          class="elevation-2"
        >
          <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td
              class="text-xs-right"
              v-bind:class="{incoming: props.item.incoming, outgoing: !props.item.incoming}">
              {{ props.item.amount }}
            </td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.user.username }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Transfers',
  apollo: {
    transfers: {
      query:
        gql`query transfers($year: Int!, $month: Int!) {
          transfers(year: $year, month: $month) {
            amount
            date
            name
            fromUser {
              id
              username
            }
            toUser {
              id
              username
            }
          }
          me {
            id
          }
        }`,
      variables() {
        return {
          year: this.$store.state.date.year(),
          month: this.$store.state.date.month() + 1,
        };
      },
      update: data => data.transfers.map((transfer) => {
        const incoming = transfer.toUser.id === data.me.id;
        return {
          amount: transfer.amount,
          date: transfer.date,
          name: transfer.name,
          user: incoming ? transfer.fromUser : transfer.toUser,
          incoming,
        };
      }),
    },
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Amount', value: 'amount', align: 'right' },
        { text: 'Date', value: 'date', align: 'right' },
        { text: 'User', value: 'from', align: 'right' },
      ],
    };
  },
};
</script>

<style scoped>
 .incoming {
   color: green;
 }

 .outgoing {
   color: red;
 }
</style>
