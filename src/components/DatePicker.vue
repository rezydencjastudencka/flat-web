<template>
  <v-dialog v-model="datePicker.isShown" persistent max-width="290">
    <v-btn flat slot="activator" class="picker-btn">Pick {{ pickerType }}</v-btn>
    <v-card>
      <v-date-picker
        ref="picker"
        v-model="datePicker.date"
        :type="pickerType"
      ></v-date-picker>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native=cancel()>Cancel</v-btn>
        <v-btn color="primary" flat @click.native=setDate()>Set</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DatePicker',
  props: ['pickerType'],
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
      this.selectedDate = moment(this.datePicker.date, 'YYYY-MM-DD');
      this.$emit('picked-date-change', this.selectedDate);
    },
    cancel() {
      this.datePicker.isShown = false;
      this.datePicker.date = this.selectedDate.format('YYYY-MM-DD');
    },
  },
};
</script>

<style scoped>
.picker-btn{
  margin: 0;
  height: 64px;
}
</style>
