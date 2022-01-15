<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import MusicList from "@/components/music-list/music-list";
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constant";

export default {
  name: "singer-detail",
  components: { MusicList },
  props: ["singer"],
  data() {
    return {
      loading: true,
      songs: [],
    };
  },
  async created() {
    const singer = this.computedSinger;
    if (!singer) {
      const path = this.$route.matched[0].path;
      this.$router.push({
        path,
      });
    }
    const ret = await getSingerDetail(singer);
    const songs = await processSongs(ret.songs);
    this.loading = false;
    this.songs = songs;
    console.log("ret=====", songs);
  },
  computed: {
    computedSinger() {
      const singer = this.singer;
      if (singer) {
        return singer;
      } else {
        const cached = storage.session.get(SINGER_KEY);
        if (cached && cached.mid === this.$route.params.id) {
          return cached;
        } else {
          return null;
        }
      }
    },
    pic() {
      return this.computedSinger?.pic;
    },
    title() {
      return this.computedSinger?.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
