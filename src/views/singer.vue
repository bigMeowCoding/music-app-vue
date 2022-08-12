<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition name="slide" appear>
        <component :is="Component" :singer="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singers";
import IndexList from "@/components/index-list/index-list";
import storage from "good-storage";
import { SINGER } from "@/assets/js/constant";
export default {
  name: "singer",
  components: { IndexList },
  data() {
    return { singers: [], selectedSinger: null };
  },
  async created() {
    const ret = await getSingerList();
    this.singers = ret.singers;
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      storage.session.set(SINGER, singer);
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
