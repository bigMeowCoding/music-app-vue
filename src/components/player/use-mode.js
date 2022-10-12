import { useStore } from "vuex";
import { computed } from "vue";
import { PLAY_MODE } from "@/assets/js/constant";

export function useMode() {
  const store = useStore();
  const playMode = computed(() => {
    return store.state.playMode;
  });
  const modeIcon = computed(() => {
    return playMode.value === PLAY_MODE.sequence
      ? "icon-sequence"
      : playMode.value === PLAY_MODE.loop
      ? "icon-loop"
      : "icon-random";
  });

  function changeMode() {
    console.log(playMode.value)
    const mode = (playMode.value + 1) % 3;
    store.dispatch("changeMode", mode);
  }
  return { modeIcon, changeMode };
}
