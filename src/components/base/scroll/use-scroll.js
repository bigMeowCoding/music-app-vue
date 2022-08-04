import { onMounted, onUnmounted, ref } from "vue";
import BScroll from "@better-scroll/core";
import observeDom from "@better-scroll/observe-dom";
BScroll.use(observeDom);
export function useScroll(rootRef, option) {
  const bsRef = ref(null);
  onMounted(() => {
    bsRef.value = new BScroll(rootRef.value, {
      observeDOM: true,

      scrollY:true,
      ...option
    });
  });
  onUnmounted(() => {
    bsRef.value.destroy();
  });
  return bsRef;
}
