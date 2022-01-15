export const currentSong = (state: any) => {
  return state.playlist[state.currentIndex] || {};
};
