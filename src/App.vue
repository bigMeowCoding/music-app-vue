<template>
  <Header />
  <tab />
  <router-view></router-view>
  <player />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import 'vant/lib/index.css';

import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
import Player from "@/components/player/player.vue";
import Poster from "@/components/poster/poster.vue";
export default defineComponent({
  components: { Poster, Player, Tab, Header },
});
</script>
