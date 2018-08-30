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
              <img :src="userAvatar">
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
            <v-icon :class="!isNavDrawerClosed?'rotated':''"> forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Toggle drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clippedLeft app fixed flat height="64">
      <v-toolbar-title>PlaceholderName</v-toolbar-title>
      <v-spacer/>
      <logo class="logo"/>
      <v-toolbar-title>Flat</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn flat>Placeholder1</v-btn>
        <DatePicker pickerType="month" v-on:picked-date-change="onPickedDateChange"/>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout>
      <router-view/>
    </v-layout>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker';
import Logo from '@/components/Logo';

export default {
  name: 'AppLayout',
  components: {
    logo: Logo,
    DatePicker,
  },
  data() {
    return {
      userName: 'Random User',
      userAvatar: 'https://i.stack.imgur.com/34AD2.jpg',
      items: [
        {
          title: 'Expenses',
          icon: 'trending_down',
          action: () => this.$router.push({ name: 'Expenses' }),
        },
        {
          title: 'Revenues',
          icon: 'trending_up',
          action: () => this.$router.push({ name: 'Revenues' }),
        },
        { title: 'Transfers', icon: 'compare_arrows', action: () => true },
        { title: 'About', icon: 'question_answer', action: () => true },
      ],
      isNavDrawerClosed: true,
    };
  },
  methods: {
    onPickedDateChange(date) {
      this.$store.commit('setDate', date);
    },
  },
};
</script>

<style>
  .rotated {
    transform: rotate(180deg);
  }

  .logo {
    height: 2em;
    width: 2em;
  }

  .nav-toggle-button {
    position: absolute;
    bottom: 0;
  }
</style>
