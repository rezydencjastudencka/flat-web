<template>
  <v-dialog v-model="newCharge.isShown" persistent>
    <v-btn flat slot="activator">Open</v-btn>
    <v-card>
      <v-card-title>New {{chargeType}}</v-card-title>
      <v-card-actions>
        <v-btn>Add</v-btn>
        <v-btn color="primary" flat @click.native=cancel()>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'NewCharge',
  props: ['chargeType', 'users[]'],
  data() {
    return {
      newCharge: {
        isShown: false,

      },
    };
  },
  methods: {
    cancel() {
      this.datePicker.isShown = false;
    },
  },
};
</script>

<style scoped>


</style>
