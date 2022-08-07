<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singers";
import IndexList from "@/components/index-list/index-list";

export default {
  name: "singer",
  components: { IndexList },
  data() {
    return { singers: [] };
  },
  async created() {
    const ret = await getSingerList();
    this.singers = ret.singers;
    console.log(ret);
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
