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
              <DeleteDialog deletingItem="revenue"
                            @confirm="deleteCharge(props.item)"/>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-snackbar
      top
      v-model="showErrorMessage">
      {{ errorMessage }}
      <v-btn flat color="pink" @click.native="showErrorMessage = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';
import DeleteDialog from '@/components/DeleteDialog';

export default {
  name: 'revenues',
  components: {
    DeleteDialog,
  },
  apollo: {
    // Query with parameters
    revenues: {
      // gql query
      query: gql`query revenues($year: Int!, $month: Int!) {
      revenues(year: $year, month: $month) {
        id,
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
      showErrorMessage: false,
      errorMessage: '',
    };
  },
  methods: {
    deleteCharge(item) {
      this.$apollo.mutate({
        // Query
        mutation: gql`mutation ($id: ID!) {
        deleteCharge(id: $id){
          status
        }
      }`,
        // Parameters
        variables: {
          id: item.id,
        },
      }).then((response) => {
        // Result
        if (response.data.deleteCharge.status === 'NOT_FOUND') {
          this.showErrorMessage = true;
          this.errorMessage = 'Revenue not found';
        }
      }).catch(() => {
        // Error
        this.showErrorMessage = true;
        this.errorMessage = 'Something went wrong :(';
      });
    },
  },
};
</script>

<style scoped>
</style>
