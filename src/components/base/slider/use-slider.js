import { onMounted, onUnmounted, ref } from "vue";
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";

BScroll.use(Slide);
export function useSlider(wrapperRef) {
  const slider = ref(null);
  const currentPageIndex = ref(0);
  onMounted(() => {
    console.log('wrappervalue',wrapperRef.value)
    slider.value = new BScroll(wrapperRef.value, {
      scrollX: true,
      scrollY: false,
      slide: {
        threshold: 100,
      },
      momentum: false,
      bounce: false,
      stopPropagation: true,
    });
    console.log("slider value", slider.value);
    slider.value.on("slideWillChange", (page) => {
      currentPageIndex.value = page.pageX;
    });
  });
  onUnmounted(() => {
    slider.value.destroy();
  });
  return { slider, currentPageIndex };
}
