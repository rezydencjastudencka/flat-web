import 'es6-promise/auto';
import moment from 'moment';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  createStore() {
    return new Vuex.Store({
      state: {
        toolbarButtons: {},
        date: moment(),
      },
      mutations: {
        setDate(state, newDate) {
          state.date = newDate;
        },
        setToolbarButton(state, button) {
          state.toolbarButtons[button.id] = button;
        },
        removeToolbarButton(state, buttonId) {
          delete state.toolbarButtons[buttonId];
        },
      },
    });
  },
};
