<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger" />
  </div>
  <router-view :singer="selectedSinger" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getSingerList } from "@/service/singer.ts";
import IndexList from "@/components/index-list/index-list.vue";
import { INone } from "../../typings/globals";
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
