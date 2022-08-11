<template>
  <div class="singer-detail">
    <music-list :loading="loading" :title="title" :pic="pic" :songs="songs" />
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singers";
import { processSongs } from "@/service/songs";
import MusicList from "@/components/music-list/music-list";

export default {
  name: "singer-detail",
  components: { MusicList },
  props: {
    singer: Object,
  },
  data() {
    return {
      songs: [],
      loading:true,
    };
  },
  computed: {
    title() {
      return this.singer?.name;
    },
    pic() {
      return this.singer?.pic;
    },
  },
  async created() {
    let ret = await getSingerDetail(this.singer);
    this.songs = await processSongs(ret.songs);
    this.loading = false;
  },
};
</script>

<style scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--m-color-background);
}
</style>
