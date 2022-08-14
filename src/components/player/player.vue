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
      <div class="middle"></div>
      <div class="bottom">
        <div class="operator">
          <div class="icon icon-left">
            <i></i>
          </div>
          <div class="icon icon-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon icon-center">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon icon-right"></div>
        </div>
      </div>
    </div>
    <audio ref="audioRef" @pause="onPause"></audio>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default {
  name: "player",
  setup() {
    const store = useStore();
    const audioRef = ref();
    const currentSong = computed(() => {
      return store.getters.currentSong;
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
    const playIcon = computed(() => {
      return playing.value ? "icon-pause" : "icon-play";
    });
    watch(currentSong, (newSong) => {
      if (!newSong.mid || !newSong.url) {
        return;
      }
      const audio = audioRef.value;
      audio.src = newSong.url;
      audio.play();
    });
    watch(playing, (p) => {
      const audio = audioRef.value;
      if (p) {
        audio.play();
      } else {
        audio.pause();
      }
    });
    function back() {
      store.commit("setFullScreen", false);
    }
    function onPause() {
      store.commit("setPlayingState", false);
    }
    function togglePlay() {
      store.commit("setPlayingState", !playing.value);
    }
    return {
      back,
      onPause,
      audioRef,
      playIcon,
      fullScreen,
      currentSong,
      playlist,
      togglePlay,
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
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operator {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          min-width: 0;
          color: var(--m-color-theme);
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
