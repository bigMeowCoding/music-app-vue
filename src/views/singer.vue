<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getSingerList } from "@/service/singer.ts";
import IndexList from "@/components/index-list/index-list.vue";

export default defineComponent({
  name: "singer",
  components: {
    IndexList,
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
  },
  data() {
    return {
      singers: [],
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
