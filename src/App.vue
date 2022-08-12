<template>
  <Header />
  <tab />
  <router-view></router-view>
  <player />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
import Player from "@/components/player/player.vue";
export default defineComponent({
  components: { Player, Tab, Header },
});
</script>
