// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import stateStore from './stateStore';

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.config.productionTip = false;

// console.log("start create vuex store");
const store = stateStore.createStore();
// console.log("dupa");

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
