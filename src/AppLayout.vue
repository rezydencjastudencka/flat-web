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
              <v-list-tile-title>{{ me ? me.username : "" }}</v-list-tile-title>
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
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer/>
      <logo class="logo"/>
      <v-toolbar-title>Flat</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn v-for="button in buttons" :key="button.name" flat @click="button.action">
          {{ button.name }}
        </v-btn>
        <DatePicker
            pickerType="month"
            v-on:picked-date-change="onPickedDateChange"
          />
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
import gql from 'graphql-tag';

export default {
  name: 'AppLayout',
  components: {
    logo: Logo,
    DatePicker,
  },
  apollo: {
    me: {
      query:
        gql`query me {
          me {
            id
            username
          }
        }`,
    },
  },
  data() {
    return {
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
        {
          title: 'Transfers',
          icon: 'compare_arrows',
          action: () => this.$router.push({ name: 'Transfers' }),
        },
        {
          title: 'Summary',
          icon: 'attach_money',
          action: () => this.$router.push({ name: 'Summary' }),
        },
      ],
      isNavDrawerClosed: true,
    };
  },
  computed: {
    buttons() {
      return this.$store.state.toolbarButtons;
    },
  },
  methods: {
    onPickedDateChange(date) {
      this.$store.commit('setDate', date);
    },
  },
};
</script>

<style>
  .logo {
    height: 2em;
    width: 2em;
  }

  .nav-toggle-button {
    position: absolute;
    bottom: 0;
  }
</style>
