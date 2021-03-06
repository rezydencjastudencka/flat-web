// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';

import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import stateStore from './stateStore';
import apolloProvider from './apolloClient';

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: stateStore.createStore(),
  router,
  provide: apolloProvider.createApolloProvider(),
  components: { App },
  template: '<App/>',
});
