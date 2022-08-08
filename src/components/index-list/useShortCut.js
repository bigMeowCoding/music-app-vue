import { computed, ref } from "vue";

export function useShortCut(prop, groupRef) {
  const scrollRef = ref();
  const shortCutList = computed(() => {
    return prop.data.map((item) => {
      return item.title;
    });
  });
  function onShortCutTouchStart(e) {
    const anchorIndex = e.target.dataset.index;
    const groupList = groupRef.value;
    const el = groupList.children[anchorIndex];
    scrollRef.value.scroll.scrollToElement(el, 0);
  }
  return {
    scrollRef,
    shortCutList,
    onShortCutTouchStart,
  };
}
