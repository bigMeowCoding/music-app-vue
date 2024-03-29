<template>
  <div class="player" v-show="playlist.length">
    <div class="normal-player" v-show="fullScreen">
      <div class="background"><img :src="currentSong.pic" alt="" /></div>
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <div class="title">{{ currentSong.name }}</div>
        <div class="sub-title">{{ currentSong.singer }}</div>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd" ref="cdRef">
              <img
                :src="currentSong.pic"
                ref="cdImgRef"
                :class="cdCls"
                class="image"
                alt=""
              />
            </div>
          </div>
        </div>
        <Scroll class="middle-r" ref="lyricScrollRef">
          <div class="lyric-wrapper">
            <div v-if="currentLyric" ref="lyricListRef">
              <p
                class="text"
                v-for="(line, index) in currentLyric.lines"
                :key="index"
                :class="{ 'current': currentLine === index }"
              >
                {{ line.txt }}
              </p>
            </div>
          </div>
        </Scroll>
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">
            {{ formatTime(currentTime) }}
          </span>
          <div class="progress-bar-wrapper">
            <progress-bar
              :progress="progress"
              @progress-changing="onProgressChanging"
              @progress-changed="onProgressChanged"
            ></progress-bar>
          </div>
          <span class="time time-r">{{
            formatTime(currentSong.duration)
          }}</span>
        </div>
        <div class="operator">
          <div class="icon icon-left">
            <i :class="modeIcon" @click="changeMode"></i>
          </div>
          <div class="icon icon-left" :class="disableIcon">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon icon-center" :class="disableIcon">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon icon-right" :class="disableIcon">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon icon-right">
            <i
              :class="favoriteIcon(currentSong)"
              @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @error="onError"
      @canplay="onCanPlay"
      @pause="onPause"
      @ended="end"
      @timeupdate="onTimeUpdate"
    ></audio>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useMode } from "@/components/player/use-mode";
import { useFavorite } from "@/components/player/use-favorite";
import ProgressBar from "@/components/player/progress-bar";
import { formatTime } from "@/assets/js/utils";
import { PLAY_MODE } from "@/assets/js/constant";
import { useCd } from "@/components/player/use-cd";
import { useLyric } from "@/components/player/use-lyric";
import Scroll from "@/components/base/scroll/scroll";
export default {
  name: "player",
  components: { Scroll, ProgressBar },
  setup() {
    let progressChanging = false;

    const store = useStore();
    const audioRef = ref();
    const songReady = ref();
    const currentTime = ref(0);

    const currentSong = computed(() => {
      return store.getters.currentSong;
    });
    const currentIndex = computed(() => {
      return store.state.currentIndex;
    });
    const playing = computed(() => {
      return store.state.playing;
    });
    const playlist = computed(() => {
      return store.state.playlist;
    });
    const fullScreen = computed(() => {
      return store.state.fullScreen;
    });
    const playMode = computed(() => {
      return store.state.playMode;
    });

    const { modeIcon, changeMode } = useMode();
    const { favoriteIcon, toggleFavorite } = useFavorite();
    const { cdCls, cdRef, cdImgRef } = useCd();
    const {
      currentLyric,
      lyricListRef,
      currentLine,
      playLyric,
      stopLyric,
      lyricScrollRef,
    } = useLyric({
      songReady,
      currentTime,
    });
    const playIcon = computed(() => {
      return playing.value ? "icon-pause" : "icon-play";
    });
    const disableIcon = computed(() => {
      return songReady.value ? null : "disable";
    });
    const progress = computed(() => {
      return currentTime.value / currentSong.value.duration;
    });
    watch(currentSong, (newSong) => {
      if (!newSong.mid || !newSong.url) {
        return;
      }
      currentTime.value = 0;
      songReady.value = false;
      const audio = audioRef.value;
      audio.src = newSong.url;
      audio.play();
    });
    watch(playing, (p) => {
      if (!songReady.value) {
        return;
      }
      const audio = audioRef.value;
      if (p) {
        audio.play();
        playLyric()
      } else {
        audio.pause();
        stopLyric()
      }
    });
    function back() {
      store.commit("setFullScreen", false);
    }
    function onPause() {
      store.commit("setPlayingState", false);
    }
    function togglePlay() {
      if (!songReady.value) {
        return;
      }
      store.commit("setPlayingState", !playing.value);
    }

    function next() {
      if (!songReady.value || !playlist.value.length) {
        return;
      }
      if (playlist.value.length === 1 || playMode.value === PLAY_MODE.loop) {
        loop();
        return;
      }
      const currentIndexValue = currentIndex.value;
      let index;
      if (currentIndexValue === playlist.value.length - 1) {
        index = 0;
      } else {
        index = currentIndexValue + 1;
      }
      store.commit("setCurrentIndex", index);
      store.commit("setPlayingState", true);
    }

    function prev() {
      if (!songReady.value || !playlist.value.length) {
        return;
      }
      if (playlist.value.length === 1 || playMode.value === PLAY_MODE.loop) {
        loop();
        return;
      }
      const currentIndexValue = currentIndex.value;
      let index;
      if (currentIndexValue === 0) {
        index = playlist.value.length - 1;
      } else {
        index = currentIndexValue - 1;
      }
      store.commit("setCurrentIndex", index);
      store.commit("setPlayingState", true);
    }
    function loop() {
      const audio = audioRef.value;
      audio.currentTime = 0;
      audio.play();
      store.commit("setPlayingState", true);
    }
    function onCanPlay() {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
    }
    function onError() {
      songReady.value = true;
    }
    function onTimeUpdate(e) {
      if (progressChanging) {
        return;
      }
      currentTime.value = e.target.currentTime;
    }
    function end() {
      currentTime.value = 0;
      if (playMode.value === PLAY_MODE.loop) {
        loop();
      } else {
        next();
      }
    }
    function onProgressChanging(progress) {
      progressChanging = true;
      currentTime.value = currentSong.value.duration * progress;
      playLyric()
      stopLyric()
    }

    function onProgressChanged(progress) {
      progressChanging = false;
      currentTime.value = currentSong.value.duration * progress;
      audioRef.value.currentTime = currentTime.value;
      store.commit("setPlayingState", true);
      playLyric()
    }
    return {
      onError,
      onCanPlay,
      back,
      onPause,
      onProgressChanging,
      onProgressChanged,
      audioRef,
      playIcon,
      changeMode,
      fullScreen,
      currentSong,
      modeIcon,
      playlist,
      togglePlay,
      next,
      prev,
      formatTime,
      disableIcon,
      toggleFavorite,
      favoriteIcon,
      currentTime,
      progress,
      onTimeUpdate,
      end,
      // cd
      cdCls,
      cdRef,
      cdImgRef,
      // lyric
      currentLyric,
      lyricListRef,
      lyricScrollRef,
      currentLine,
      stopLyric,
      playLyric,
    };
  },
};
</script>

<style scoped lang="scss">
.player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--m-color-background);
    z-index: 150;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      filter: blur(20px);
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 24px;
      .back {
        position: absolute;
        top: 0;
        left: 8px;
        z-index: 50;
      }
      .icon-back {
        font-size: var(--m-font-size-large-x);
        display: block;
        padding: 8px;
        color: var(--m-color-theme);
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        color: var(--m-color-text);
        font-size: var(--m-font-size-large);
      }
      .sub-title {
        color: var(--m-color-text);
        line-height: 24px;
        text-align: center;
        font-size: var(--m-font-size-medium);
      }
    }
    .middle {
      position: fixed;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      width: 100%;
      .middle-l {
        display: none;
        //display: inline-block;
        vertical-align: top;
        padding-top: 80%;
        width: 100%;
        height: 0;
        position: relative;
        .cd-wrapper {
          top: 0;
          width: 80%;
          height: 100%;
          left: 10%;
          position: absolute;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
      }
      .middle-r {
        display: inline-block;
        width: 100%;
        height: 100%;
        vertical-align: top;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          text-align: center;
          overflow: hidden;
          .text {
            line-height: 32px;
            color: var(--m-color-text-l);
            font-size: var(--m-font-size-medium);
            &.current {
              color: var(--m-color-text);
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .progress-wrapper {
        width: 80%;
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding: 10px 0;
        .time {
          font-size: var(--m-font-size-small);
          color: var(--m-color-text);
          width: 40px;
          flex: 0 0 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operator {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          min-width: 0;
          color: var(--m-color-theme);
          &.disable {
            color: var(--m-color-theme-d);
          }
          i {
            font-size: 30px;
          }
        }
        .icon-left {
          text-align: right;
        }
        .icon-center {
          padding: 0 20px;
          text-align: center;
        }
        .icon-right {
          text-align: left;
        }
      }
    }
  }
}
</style>
