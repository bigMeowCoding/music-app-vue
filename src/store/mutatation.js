const mutations = {
  setSequence(state, list) {
    state.sequenceList = list;
  },
  setPlayList(state, list) {
    state.playlist = list;
  },
  setPlayMode(state, mode) {
    state.playMode = mode;
  },
  setPlayingState(state, playing) {
    state.playing = playing;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  setFavoriteList(state, list) {
    state.favoriteList = list;
  },
};
export default mutations;
