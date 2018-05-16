<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-data-table
          :headers="headers"
          :items="revenues"
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
            <td class="text-xs-right">
              {{ props.item.toUsers.map(x => x.username).join(", ") }}
            </td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="editItem(props.item)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'revenues',

  apollo: {
    // Query with parameters
    revenues: {
      // gql query
      query: gql`query revenues($year: Int!, $month: Int!) {
      revenues(year: $year, month: $month) {
        name,
        amount,
        date,
        fromUser {
          username
        }
        toUsers {
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
        { text: 'To', value: 'to' },
      ],
      revenues: [],
    };
  },
  methods: {
    deleteItem(item) {
      const index = this.revenues.indexOf(item);
      // TODO: Send delete query and fetch new revenues list
      return confirm('Are you sure you want to delete this item?') && this.revenues.splice(index, 1);
    },
  },
};
</script>

<style scoped>
</style>
