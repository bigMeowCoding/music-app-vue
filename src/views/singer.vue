<template>
  <div class="singer">
    <IndexList :data="singers" @select="selectSinger" />
  </div>
  <router-view v-slot="{ Component }">
    <transition appear name="slide">
      <component :is="Component" :singer="selectedSinger" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getSingerList } from "@/service/singer.ts";
import IndexList from "@/components/index-list/index-list.vue";
import { INone } from "../../typings/globals";
import { SINGER_KEY } from "@/assets/js/constant";
import storage from "good-storage";

export interface ISingerBase {
  mid: any;
}
export default defineComponent({
  name: "singer",
  components: {
    IndexList,
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
  },
  methods: {
    selectSinger(singer: ISingerBase) {
      this.selectedSinger = singer;
      storage.session.set(SINGER_KEY, singer);
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
  },
  data(): { singers: any[]; selectedSinger: ISingerBase | INone } {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
});
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
