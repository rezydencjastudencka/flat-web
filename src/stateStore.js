import 'es6-promise/auto';
import moment from 'moment';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  createStore() {
    return new Vuex.Store({
      state: {
        sample: 10,
        date: moment(),
      },
      mutations: {
        set(state) {
          state.month += 1;
        },
        setDate(state, newDate) {
          state.date = newDate;
        },
      },
    });
  },
};
