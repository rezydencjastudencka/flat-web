<template>
  <div>
    <v-navigation-drawer
      app
      mobileBreakPoint="1"
      clipped
      stateless
      fixed
      :mini-variant="isNavDrawerClosed"
      permanent
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
        <v-list-tile @click.native.stop="isNavDrawerClosed = !isNavDrawerClosed">
          <v-list-tile-action>
            <v-icon :class="!isNavDrawerClosed?'rotated':''"> forward </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Toggle drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clippedLeft app fixed flat height="64">
      <v-layout row justify-space-between>
        <v-toolbar-title>PlaceholderName</v-toolbar-title>
        <div style="display: flex">
          <logo class="logo"/>
          <v-toolbar-title>Flat</v-toolbar-title>
        </div>
        <v-toolbar-items>
          <v-btn flat>Placeholder1</v-btn>
          <v-btn flat>Placeholder2</v-btn>
        </v-toolbar-items>
      </v-layout>
    </v-toolbar>
    <v-layout><router-view/></v-layout>
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
      userName: 'Random User',
      userAvatar: 'https://i.stack.imgur.com/34AD2.jpg',
      items: [
        { title: 'Expenses', icon: 'trending_down', action: () => true },
        { title: 'Incomes', icon: 'trending_up', action: () => true },
        { title: 'Transfers', icon: 'compare_arrows', action: () => true },
        { title: 'About', icon: 'question_answer', action: () => true },
      ],
      isNavDrawerClosed: true,
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
