<template>singerdetail</template>

<script>
import { getSingerDetail } from "@/service/singers";

export default {
  name: "singer-detail",
  props: {
    singer: Object,
  },
  async created() {
    const ret = await getSingerDetail(this.singer);
    console.log(ret);
  },
};
</script>

<style scoped></style>
