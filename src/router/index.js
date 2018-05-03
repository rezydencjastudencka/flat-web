import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import AppLayout from '@/AppLayout';
import LoginComponent from '@/components/LoginComponent';
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
          component: HelloWorld,
          name: 'HelloWorld',
        },
      ],
    },
  ],
});
