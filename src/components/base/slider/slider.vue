<template>
  <div ref="rootRef">slider{{ a }}</div>
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
    console.log(slider, currentPageIndex);
    return { rootRef };
  },
};
</script>

<style scoped></style>
