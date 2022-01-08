import { ref, computed } from "vue";

export default function useShortcut(props: any, groupRef: any) {
  const scrollRef = ref();
  const ANCHOR_HEIGHT = 18;

  const shortcutList = computed(() => {
    return props.data.map((group: any) => {
      return group.title;
    });
  });
  const touch: any = {};
  function onShortcutTouchStart(e: any) {
    const anchorIndex = parseInt(e.target.dataset.index);

    touch.y1 = e.touches[0].pageY;
    touch.anchorIndex = anchorIndex;
    scrollTo(anchorIndex);
  }

  function scrollTo(anchorIndex: number) {
    if (isNaN(anchorIndex)) {
      return;
    }
    anchorIndex = Math.max(
      0,
      Math.min(shortcutList.value.length - 1, anchorIndex)
    );

    const targetEl = groupRef.value.children[anchorIndex];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEl, 0);
  }
  function onShortcutTouchMove(e: any) {
    touch.y2 = e.touches[0].pageY;
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0;
    const anchorIndex = touch.anchorIndex + delta;
    scrollTo(anchorIndex);
  }
  return {
    shortcutList,
    scrollRef,
    onShortcutTouchMove,
    onShortcutTouchStart,
  };
}
