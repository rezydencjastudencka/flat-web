<template>
  <v-dialog v-model="datePicker.isShown" persistent max-width="290">
    <v-btn color="primary" dark slot="activator">Pick month</v-btn>
    <v-card>
      <v-date-picker ref="picker" v-model="datePicker.date" type="month"></v-date-picker>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="datePicker.isShown = false">Cancel</v-btn>
        <v-btn color="primary" flat @click.native=setDate()>Set</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DatePicker',
  data() {
    return {
      datePicker: {
        isShown: false,
        date: null,
      },
      selectedDate: moment(),
    };
  },
  methods: {
    setDate() {
      this.datePicker.isShown = false;
      this.selectedDate = moment(this.datePicker.date, 'YYYY-MM');
      this.$emit('sperma-na-ryju', this.selectedDate);
    },
  },
};
</script>

<style scoped>
</style>
