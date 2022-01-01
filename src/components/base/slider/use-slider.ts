import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from "vue";
import BScroll from "@better-scroll/core";
import { Ref } from "@vue/reactivity";
import Slide from "@better-scroll/slide";
BScroll.use(Slide);

export default function useSlider(wrapperRef: Ref<HTMLElement | null>) {
  const slider = ref<BScroll | null>(null);
  const currentPageIndex = ref(0);

  onMounted(() => {
    if (!wrapperRef.value) {
      return;
    }
    const sliderVal = (slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    }));

    sliderVal.on("slideWillChange", (page: { pageX: number }) => {
      currentPageIndex.value = page.pageX;
    });
  });

  onUnmounted(() => {
    slider.value?.destroy();
  });
  onActivated(() => {
    slider.value?.enable();
    slider.value?.refresh();
  });

  onDeactivated(() => {
    slider.value?.disable();
  });

  return {
    slider,
    currentPageIndex,
  };
}
