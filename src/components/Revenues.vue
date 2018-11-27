<template>
  <v-container>
    <NewRevenue revenueType="Revenue" :isShown.sync="isNewRevenueShown"/>
    <ToolbarButton name="Add revenue" @click="isNewRevenueShown = true"/>
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
                            @confirm="deleteRevenue(props.item)"/>
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
import ToolbarButton from '@/components/ToolbarButton';
import NewRevenue from '@/components/NewRevenue';

export default {
  name: 'revenues',
  components: {
    DeleteDialog,
    ToolbarButton,
    NewRevenue,
  },
  apollo: {
    // Query with parameters
    revenues: {
      // gql query
      query:
        gql`query revenues($year: Int!, $month: Int!) {
          revenues(year: $year, month: $month) {
            id,
            name,
            amount,
            date,
            fromUser {
              id,
              username
            }
            toUsers {
              id,
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
        { text: 'Amount', value: 'amount', align: 'right' },
        { text: 'Date', value: 'date', align: 'right' },
        { text: 'To', value: 'to', align: 'right' },
        {
          text: '', value: '', align: 'right', sortable: false,
        },
      ],
      isNewRevenueShown: false,
      revenues: [],
      showErrorMessage: false,
      errorMessage: '',
    };
  },
  methods: {
    deleteRevenue(item) {
      this.$apollo.mutate({
        // Query
        mutation:
          gql`mutation ($id: ID!) {
            deleteRevenue(id: $id){
              status
            }
          }`,
        // Parameters
        variables: {
          id: item.id,
        },
      }).then((response) => {
        // Result
        if (response.data.deleteRevenue.status === 'NOT_FOUND') {
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
