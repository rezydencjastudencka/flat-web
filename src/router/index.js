import Vue from 'vue';
import Router from 'vue-router';
import Expenses from '@/components/Expenses';
import Transfers from '@/components/Transfers';
import AppLayout from '@/AppLayout';
import LoginComponent from '@/components/LoginComponent';
import Revenues from '@/components/Revenues';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Sign In',
      component: LoginComponent,
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          component: Expenses,
          name: 'Expenses',
        },
        {
          path: 'revenues',
          component: Revenues,
          name: 'Revenues',
        },
        {
          path: 'transfers',
          component: Transfers,
          name: 'Transfers',
        },
      ],
    },
  ],
});
