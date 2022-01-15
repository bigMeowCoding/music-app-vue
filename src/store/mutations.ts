import { PLAY_MODE } from "@/assets/js/constant";

const mutations = {
  setPlayingState(state: any, playing: boolean) {
    state.playing = playing;
  },
  setSequenceList(state: any, list: any[]) {
    state.sequenceList = list;
  },
  setPlaylist(state: any, list: any[]) {
    state.playlist = list;
  },
  setPlayMode(state: any, mode: PLAY_MODE) {
    state.playMode = mode;
  },
  setCurrentIndex(state: any, index: number) {
    state.currentIndex = index;
  },
  setFullScreen(state: any, fullScreen: boolean) {
    state.fullScreen = fullScreen;
  },
};

export default mutations;
