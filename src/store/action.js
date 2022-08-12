import { PLAY_MODE } from "@/assets/js/constant";

export function selectPlay({ commit }, { list, index }) {
  commit("setSequence", list);
  commit("setPlayList", list);
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setPlayingState", true);
  commit("setCurrentIndex", index);
  commit("setFullScreen", true);
}
