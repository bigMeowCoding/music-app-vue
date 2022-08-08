import { onMounted, onUnmounted, ref } from "vue";
import BScroll from "@better-scroll/core";
import observeDom from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";

BScroll.use(observeDom);
BScroll.use(ObserveImage);

export function useScroll(rootRef, option, emit) {
  const bsRef = ref(null);
  onMounted(() => {
    console.log({
      observeDOM: true,
      observeImage: true, // 开启 observe-image 插件
      momentum: true,
      ...option,
    });
    const bs = (bsRef.value = new BScroll(rootRef.value, {
      observeDOM: true,
      observeImage: true, // 开启 observe-image 插件
      ...option,
    }));
    if (option.probeType > 0) {
      bs.on("scroll", (pos) => {
        emit("scroll", pos);
      });
    }
  });
  onUnmounted(() => {
    bsRef.value.destroy();
  });
  return {
    scroll: bsRef,
  };
}
