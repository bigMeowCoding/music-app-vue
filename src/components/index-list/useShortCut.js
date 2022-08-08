import { computed, ref } from "vue";

export function useShortCut(prop, groupRef) {
  const scrollRef = ref();
  const ANCHOR_HEIGHT = 18;

  const shortCutList = computed(() => {
    return prop.data.map((item) => {
      return item.title;
    });
  });
  const touch = {};
  function onShortCutTouchStart(e) {
    touch.p1 = e.touches[0].pageY;
    const anchorIndex = parseInt(e.target.dataset.index);
    touch.anchorIndex = anchorIndex;
    scrollToElement(anchorIndex);
  }
  function onShortCutTouchMove(e) {
    const pageY = e.touches[0].pageY;
    const index = Math.floor((pageY - touch.p1) / ANCHOR_HEIGHT);
    scrollToElement(index + touch.anchorIndex);
  }

  function scrollToElement(index) {
    index = Math.max(0, Math.min(index, shortCutList.value.length - 1));
    const groupList = groupRef.value;
    const el = groupList.children[index];
    scrollRef.value.scroll.scrollToElement(el, 0);
  }
  return {
    scrollRef,
    shortCutList,
    onShortCutTouchStart,
    onShortCutTouchMove,
  };
}
