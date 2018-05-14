<template>
  <v-dialog v-model="newCharge.isShown" max-width="600px">
    <v-btn flat slot="activator">Open</v-btn>
    <v-card>
      <v-card-title>New {{chargeType}}</v-card-title>
      <v-card-text>
        <v-form style="padding-left: 30px; padding-right: 30px">
          <v-text-field
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            label="Amount"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn >Add</v-btn>
        <v-btn color="primary" flat @click.stop="newCharge.isShown=false">Cancel</v-btn>
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
  },
};
</script>

<style scoped>


</style>
