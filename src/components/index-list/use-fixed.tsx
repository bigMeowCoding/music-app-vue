import { ref, watch, computed, nextTick } from "vue";

export default function useFixed(props: any) {
  const groupRef = ref<HTMLElement | null>(null);
  const TITLE_HEIGHT = 30;

  const scrollY = ref(0);
  const currentIndex = ref(0);
  const listHeights = ref<number[]>([]);
  const distance = ref(0);

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return "";
    }
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  });
  const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    let diff = 0;
    if (distanceVal > 0 && distanceVal < TITLE_HEIGHT) {
      diff = distanceVal - TITLE_HEIGHT;
    }
    return {
      transform: `translate3d(0,${diff}px,0)`,
    };
  });
  watch(
    () => {
      return props.data;
    },
    async () => {
      await nextTick();
      const group = groupRef.value;
      if (!group) {
        return;
      }
      const list = group.children;
      let height = 0;
      const listHeightsValue = listHeights.value;
      listHeightsValue.length = 0;
      listHeightsValue.push(height);
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        listHeightsValue.push(height);
      }
    }
  );
  watch(scrollY, (newY) => {
    const listHeightVal = listHeights.value;
    for (let i = 0; i < listHeightVal.length - 1; i++) {
      const heightTop = listHeightVal[i];
      const heightBottom = listHeightVal[i + 1];
      if (newY >= heightTop && newY < heightBottom) {
        currentIndex.value = i;
        distance.value = heightBottom - newY;
        break;
      }
    }
  });
  function onScroll(pos: { x: number; y: number }) {
    scrollY.value = -pos.y;
  }
  return {
    groupRef,
    onScroll,
    fixedStyle,
    fixedTitle,
    currentIndex,
  };
}
