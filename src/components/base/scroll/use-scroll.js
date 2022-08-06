import { onMounted, onUnmounted, ref } from "vue";
import BScroll from "@better-scroll/core";
import observeDom from "@better-scroll/observe-dom";
import ObserveImage from '@better-scroll/observe-image'

BScroll.use(observeDom);
BScroll.use(ObserveImage)

export function useScroll(rootRef, option) {
  const bsRef = ref(null);
  onMounted(() => {
    bsRef.value = new BScroll(rootRef.value, {
      observeDOM: true,
      observeImage: true, // 开启 observe-image 插件
      ...option
    });
  });
  onUnmounted(() => {
    bsRef.value.destroy();
  });
  return bsRef;
}
