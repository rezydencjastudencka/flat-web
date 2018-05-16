<template>
  <v-dialog v-model="deleteDialog.isShown" persistent max-width="290">
    <v-btn icon slot="activator" class="mx-0">
      <v-icon color="pink">delete</v-icon>
    </v-btn>
    <v-card>
      <v-card-text>
        Are you sure, you want to remove this {{ deletingItem }}?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native=cancel()>No</v-btn>
        <v-btn color="primary" flat @click.native=deleteItem()>Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'DeleteDialog',
  props: ['deletingItem'],
  data() {
    return {
      deleteDialog: {
        isShown: false,
      },
    };
  },
  methods: {
    deleteItem() {
      this.deleteDialog.isShown = false;
      this.$emit('delete-confirmation', true);
    },
    cancel() {
      this.deleteDialog.isShown = false;
    },
  },
};
</script>

<style scoped>
</style>
