import { PLAY_MODE } from "@/assets/js/constant";
import { shuffle } from "@/assets/js/utils";

export function selectPlay({ commit }, { list, index }) {
  commit("setSequence", list);
  commit("setPlayList", list);
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setPlayingState", true);
  commit("setCurrentIndex", index);
  commit("setFullScreen", true);
}

export function randomPlay({ commit }, { list }) {
  commit("setSequence", list);
  commit("setPlayList", shuffle(list));
  commit("setPlayMode", PLAY_MODE.random);
  commit("setPlayingState", true);
  commit("setCurrentIndex", 0);
  commit("setFullScreen", true);
}

export function changeMode({ commit, state, getters }, mode ) {
  const id = getters.currentSong.id;
  if (mode === PLAY_MODE.random) {
    commit("setPlayList", shuffle(state.sequenceList));
  } else {
    commit("setPlayList", state.sequenceList);
  }
  const index = state.playlist.findIndex((item) => item.id === id);
  commit("setCurrentIndex", index);
  commit("setPlayMode", mode);
}
