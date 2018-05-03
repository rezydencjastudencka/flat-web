<template>
  <div>
    <v-navigation-drawer
      app
      mobileBreakPoint="1"
      clipped
      stateless
      fixed
      :mini-variant="navDrawerCompact"
      v-model="navDrawer"
    >
      <v-toolbar flat class="transparent" height="64">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="userAvatar" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ userName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
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
      <v-list class="pt-0 nav-toggle-button" dense>
        <v-list-tile @click.native.stop="navDrawerCompact = !navDrawerCompact">
          <v-list-tile-action>
            <v-icon :class="!navDrawerCompact?'rotated':''"> forward </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Toggle drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clippedLeft app fixed flat height="64">
      <logo class="logo"/>
      <v-toolbar-title>Flat</v-toolbar-title>
    </v-toolbar>
    <v-content><router-view/></v-content>
  </div>
</template>

<script>
import Logo from '@/components/Logo';

export default {
  name: 'AppLayout',
  components: {
    logo: Logo,
  },
  data() {
    return {
      navDrawer: true,
      userName: 'Random User',
      userAvatar: 'https://i.stack.imgur.com/34AD2.jpg',
      items: [
        { title: 'Expenses', icon: 'trending_down', action: () => true },
        { title: 'Incomes', icon: 'trending_up', action: () => true },
        { title: 'Transfers', icon: 'compare_arrows', action: () => true },
        { title: 'About', icon: 'question_answer', action: () => true },
      ],
      navDrawerCompact: true,
    };
  },
};
</script>

<style>
.rotated{
  transform: rotate(180deg);
}
.logo{
  height: 2em;
  width: 2em;
}
.nav-toggle-button{
  position: absolute;
  bottom: 0;
}
</style>
