<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> MENU </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Login",
    icon: "login",
    link: "https://hana-firebase.netlify.app/#/",
  },
  {
    title: "Main",
    icon: "home",
    link: "https://hana-firebase.netlify.app/#/main",
  },
  {
    title: "MyPage",
    icon: "person",
    link: "https://hana-firebase.netlify.app/#/myInfo",
  },
  {
    title: "Hana's Profile",
    icon: "woman",
    link: "https://hanatest.netlify.app/#/",
  },
  {
    title: "Hana's Instagram",
    icon: "favorite",
    link: "https://www.instagram.com/hana_x.x_/",
  },
  {
    title: "Hana's Github",
    icon: "school",
    link: "https://github.com/SeaweedOne/",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref("false");

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
