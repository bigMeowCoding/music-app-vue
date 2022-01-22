<template>
  <MHeader />
  <Tab />
  <router-view />
  <music-player></music-player>
</template>
<script>
import MHeader from "@/components/header/header";
import Tab from "@/components/tab/tab";
import MusicPlayer from "@/components/player/player";

export default {
  components: { MusicPlayer, MHeader, Tab },
};
</script>
