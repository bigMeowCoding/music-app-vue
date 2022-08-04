<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slider v-if="sliders.length" :sliders="sliders" />
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "@/components/base/slider/slider";
import { getRecommend } from "@/service/recommend";
export default {
  name: "recommend",
  components: { Slider },
  data() {
    return { sliders: [] };
  },
  async created() {
    const res = await getRecommend();
    this.sliders = res.sliders;
    console.log(res);
  },
};
</script>

<style lang="scss">
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    .slider-wrapper {
      width: 100%;
      position: relative;
    }
  }
}
</style>
