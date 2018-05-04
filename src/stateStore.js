import 'es6-promise/auto';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  createStore() {
    return new Vuex.Store({
      state: {
        sample: 10,
      },
      mutations: {
        set(state) {
          state.month += 1;
        },
      },
    });
  },
};
