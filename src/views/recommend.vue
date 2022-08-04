<template>
  recommend
  <slider />
</template>

<script>
import Slider from "@/components/base/slider/slider";
import { getRecommend } from "@/service/recommend";
export default {
  name: "recommend",
  components: { Slider },
  async created() {
    const res = await getRecommend();
    console.log(res);
  },
};
</script>

<style scoped></style>
