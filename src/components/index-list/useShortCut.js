import { computed } from "vue";

export function useShortCut(prop) {
  const shortCutList = computed(() => {
    return prop.data.map((item) => {
      return item.title;
    });
  });
  return {
    shortCutList,
  };
}
