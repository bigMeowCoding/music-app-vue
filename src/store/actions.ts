import { PLAY_MODE } from "@/assets/js/constant";
import { shuffle } from "@/assets/js/utils";

export function selectPlay(
  { commit }: { commit: any },
  { list, index }: { list: any; index: number }
) {
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", list);
  commit("setCurrentIndex", index);
}

export function randomPlay({ commit }: { commit: any }, list: any[]) {
  commit("setPlayMode", PLAY_MODE.random);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", shuffle(list));
  commit("setCurrentIndex", 0);
}
