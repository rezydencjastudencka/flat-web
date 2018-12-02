<template>
  <v-container>
    <NewTransfer :isShown.sync="isNewTransferShown"/>
    <ToolbarButton name="Add transfer" @click="isNewTransferShown = true"/>
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
            <td>
              <DeleteDialog deletingItem="transfer"
                            @confirm="deleteTransfer(props.item)"
                            v-show="!props.item.incoming"/>
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
import DeleteDialog from '@/components/DeleteDialog';
import NewTransfer from '@/components/NewTransfer';
import ToolbarButton from '@/components/ToolbarButton';
import gql from 'graphql-tag';

export default {
  name: 'Transfers',
  components: {
    DeleteDialog,
    NewTransfer,
    ToolbarButton,
  },
  apollo: {
    transfers: {
      query:
        gql`query transfers($year: Int!, $month: Int!) {
          transfers(year: $year, month: $month) {
            id
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
        const incoming = transfer.fromUser.id !== data.me.id;
        return {
          id: transfer.id,
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
        {
          text: '', value: '', align: 'right', sortable: false,
        },
      ],
      isNewTransferShown: false,
      showErrorMessage: false,
      errorMessage: '',
    };
  },
  methods: {
    deleteTransfer(item) {
      this.$apollo.mutate({
        // Query
        mutation:
          gql`mutation ($id: ID!) {
            deleteTransfer(id: $id){
              status
            }
          }`,
        // Parameters
        variables: {
          id: item.id,
        },
      }).then((response) => {
        // Result
        if (response.data.deleteTransfer.status === 'NOT_FOUND') {
          this.showErrorMessage = true;
          this.errorMessage = 'Transfer not found';
        }
        this.$apollo.queries.transfers.refetch();
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
 .incoming {
   color: green;
 }

 .outgoing {
   color: red;
 }
</style>
