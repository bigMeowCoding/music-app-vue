import { computed, nextTick, ref, watch } from "vue";

export function useFixed(props) {
  const scrollRef = ref();
  const groupRef = ref();
  const groupHeightRef = ref([]);
  const currentIndexRef = ref(0);
  const fixedTitle = computed(() => {
    if (scrollRef.value < 0) {
      return "";
    }
    const currentGroup = props.data[currentIndexRef.value];
    return currentGroup?.title ?? "";
  });
  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );
  watch(scrollRef, (newY) => {
    const groupHeight = groupHeightRef.value;
    for (let i = 0; i < groupHeight.length; i++) {
      const top = groupHeight[i];
      const bottom = groupHeight[i + 1];
      if (newY >= top && newY <= bottom) {
        currentIndexRef.value = i;
      }
    }
  });

  function calculate() {
    const groupChildren = groupRef.value.children;
    const groupHeight = groupHeightRef.value;
    let height = 0;
    groupHeight.length = 0;
    groupHeight.push(height);
    for (let i = 0; i < groupChildren.length; i++) {
      height += groupChildren[i].clientHeight;
      groupHeight.push(height);
    }
  }

  function onScroll(pos) {
    scrollRef.value = -pos.y;
  }
  return {
    onScroll,
    fixedTitle,
    groupRef,
  };
}
