import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export function useCd() {
  const store = useStore();
  const cdRef = ref();
  const cdImgRef = ref();
  const playing = computed(() => {
    return store.state.playing;
  });
  const cdCls = computed(() => {
    return playing.value ? "playing" : null;
  });
  watch(playing, (newVal) => {
    const imgTransform = getComputedStyle(cdImgRef.value).transform;
    const cdTransform = getComputedStyle(cdRef.value).transform;
    if (!newVal) {
      console.log(imgTransform, cdTransform);
      cdRef.value.style.transform =
        cdTransform === "none"
          ? imgTransform
          : cdTransform.concat(" ", imgTransform);
    }
  });
  return { cdCls, cdRef, cdImgRef };
}
