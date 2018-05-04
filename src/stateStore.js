import 'es6-promise/auto';

import Vuex from 'vuex';

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
