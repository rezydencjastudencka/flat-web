import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import LoginComponent from '@/components/LoginComponent';
import ExpensesList from '@/components/ExpensesList';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'Sign In',
      component: LoginComponent,
    },
    {
      path: '/expenses',
      component: ExpensesList,
    },
  ],
});
