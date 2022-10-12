import { FAVORITE_KEY, PLAY_MODE } from "@/assets/js/constant";
import { load } from "@/assets/js/array-store";

const state = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  favoriteList: load(FAVORITE_KEY),
  fullScreen: false,
};

export default state;
