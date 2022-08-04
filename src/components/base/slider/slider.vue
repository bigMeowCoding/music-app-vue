<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="item in sliders" :key="item.id">
        <a :href="item.link"><img :src="item.pic" alt="slider" /></a>
      </div>
    </div>
    <div class="dot-wrapper">
      <div
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{
          active: index === currentPageIndex,
        }"
      />
    </div>
  </div>
</template>

<script>
import { useSlider } from "@/components/base/slider/use-slider";
import { ref } from "vue";

export default {
  name: "slider",
  data() {
    return { a: 1 };
  },
  props: {
    sliders: Array,
    default() {
      return [];
    },
  },
  setup() {
    const rootRef = ref(null);
    const { slider, currentPageIndex } = useSlider(rootRef);
    return { rootRef, currentPageIndex };
  },
};
</script>

<style lang="scss">
.slider {
  min-height: 1px;
  touch-action: pan-y;

  .slider-group {
    white-space: nowrap;
    display: flex;
    .slider-page {
      a {
        display: block;
        img {
          width: 100%;
        }
      }
    }
  }
  .dot-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      background-color: var(--m-color-text-l);
      margin: 0 4px;
      &.active {
        width: 20px;
        border-radius: 5px;
      }
    }
  }
}
</style>
