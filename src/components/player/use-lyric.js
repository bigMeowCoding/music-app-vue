import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { getLyric } from "@/service/songs";
import Lyric from "lyric-parser";

export function useLyric({ songReady, currentTime }) {
  const store = useStore();
  const currentLyric = ref(null);
  const lyricScrollRef = ref(null);
  const lyricListRef = ref(null);
  const currentLine = ref(0);
  const currentSong = computed(() => store.getters.currentSong);

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return;
    }
    stopLyric();
    currentLine.value = 0;
    currentLyric.value = null;

    const lyric = await getLyric(newSong);
    store.commit("addSongLyric", { song: newSong, lyric });
    if (currentSong.value.lyric !== lyric) {
      return; // 当获取歌词时候切换了歌曲下边逻辑可以不执行
    }
    currentLyric.value = new Lyric(lyric, ({ lineNum, txt }) => {
      console.log(lineNum, txt);
      currentLine.value = lineNum;
      const scroll = lyricScrollRef.value;
      const lyricList= lyricListRef.value;
      if(!scroll || !lyricList) {
        return
      }
      if(lineNum>5) {
        const el = lyricList.children[lineNum-5];
        scroll.scroll.scrollToElement(el,1000)
      } else {
        scroll.scroll.scrollTo(0,0,1000)
      }
    });
    const hasLyric = currentLyric.value.lines.length > 0;
    if (hasLyric && songReady.value) {
      playLyric();
    }
  });
  function playLyric() {
    const lyric = currentLyric.value;
    lyric?.seek(currentTime.value * 1000);
  }
  function stopLyric() {
    const lyric = currentLyric.value;
    lyric?.stop();
  }
  return {
    currentLyric,
    lyricScrollRef,
    playLyric,
    stopLyric,
    lyricListRef,
    currentLine,
  };
}
