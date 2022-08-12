<template>
  <div class="singer-detail">
    <music-list :loading="loading" :title="title" :pic="pic" :songs="songs" />
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singers";
import { processSongs } from "@/service/songs";
import MusicList from "@/components/music-list/music-list";
import storage from "good-storage";
import { SINGER } from "@/assets/js/constant";

export default {
  name: "singer-detail",
  components: { MusicList },
  props: {
    singer: Object,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    compuedSinger() {
      if (this.singer) {
        return this.singer;
      } else {
        const cache = storage.session.get(SINGER);
        if (cache && cache.mid === this.$route.params.id) {
          return cache;
        }
      }
    },
    title() {
      return this.compuedSinger?.name;
    },
    pic() {
      return this.compuedSinger?.pic;
    },
  },
  async created() {
    if (!this.compuedSinger) {
      const path = this.$route.matched[0].path;
      this.$router.push({ path });
      return;
    }
    let ret = await getSingerDetail(this.compuedSinger);
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
