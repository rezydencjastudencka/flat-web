<template>
  <div>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ userName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="item.action">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Flat</v-toolbar-title>
    </v-toolbar>
    <v-content><router-view/></v-content>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      drawer: null,
      userName: 'RandomUser',
      items: [
        { title: 'Expenses', icon: 'trending_down', action: '/expenses' },
        { title: 'Incomes', icon: 'trending_up', action: '/incomes' },
        { title: 'Transfers', icon: 'compare_arrows', action: '/transfers' },
        { title: 'About', icon: 'question_answer', action: '/about' },
      ],
    };
  },
};
</script>

<style>
</style>
