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
      <div class="bottom"></div>
    </div>
    <audio ref="audioRef"></audio>
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
    const playlist = computed(() => {
      return store.state.playlist;
    });
    const fullScreen = computed(() => {
      return store.state.fullScreen;
    });
    watch(currentSong, (newSong) => {
      if (!newSong.mid || !newSong.url) {
        return;
      }
      const audio = audioRef.value;
      audio.src = newSong.url;
      audio.play();
    });
    function back() {
      store.commit("setFullScreen", false);
    }
    return { back, audioRef, fullScreen, currentSong, playlist };
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
  }
}
</style>
