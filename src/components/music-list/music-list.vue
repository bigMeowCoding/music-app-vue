<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back" />
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" ref="bgImageRef" :style="bgImageStyle">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      @scroll="onScroll"
      :probe-type="3"
      v-loading="loading"
      v-no-result="noResult"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @selectSong="selectSong" />
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from "@/components/base/song-list/song-list";
import Scroll from "@/components/base/scroll/scroll";
import { mapActions } from "vuex";
const navHeight = 40;
export default {
  name: "music-list",
  components: { Scroll, SongList },
  data() {
    return {
      bgImageHeight: 0,
      scrollY: 0,
      maxTransformY: 0,
    };
  },
  computed: {
    noResult() {
      return !this.loading && !this.songs.length;
    },
    filterStyle() {
      let blur = 0;
      if (this.scrollY > 0) {
        blur =
          Math.min(
            this.maxTransformY / this.bgImageHeight,
            this.scrollY / this.bgImageHeight
          ) * 20;
      }
      console.log({ backdropFilter: `blur(${blur})px` });
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
    playBtnStyle() {
      let display = "block";
      if (this.scrollY > this.maxTransformY) {
        display = "none";
      }
      return {
        display,
      };
    },
    bgImageStyle() {
      let paddingTop = "70%";
      let zIndex = 0,
        height = 0,
        translateZ = 0,
        scale = 1;
      if (this.scrollY > this.maxTransformY) {
        zIndex = 10;
        paddingTop = 0;
        translateZ = 1;
        height = navHeight + "px";
      }
      if (this.scrollY < 0) {
        scale = 1 + Math.abs(this.scrollY / this.bgImageHeight);
      }
      return {
        transform: `scale(${scale})translateZ(${translateZ}px)`,
        paddingTop,
        height,
        zIndex,
        backgroundImage: `url(${this.pic})`,
      };
    },
    scrollStyle() {
      return {
        top: this.bgImageHeight + "px",
      };
    },
  },
  mounted() {
    this.bgImageHeight = this.$refs.bgImageRef.clientHeight;
    this.maxTransformY = this.bgImageHeight - navHeight;
  },
  props: {
    loading: Boolean,
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
  },
  methods: {
    back() {
      this.$router.back();
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    selectSong({ song, index }) {
      this.selectPlay({ list: this.songs, index });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style scoped lang="scss">
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      padding: 10px;
      display: block;
      font-size: var(--m-font-size-large-x);
      color: var(--m-color-theme);
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    text-align: center;
    line-height: 40px;
    color: var(--m-color-text);
    font-size: var(--m-font-size-large);
    @include no-wrap();
  }
  .bg-image {
    position: relative;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        width: 135px;
        border-radius: 100px;
        padding: 7px 0;
        margin: 0 auto;
        color: var(--m-color-theme);
        border: 1px solid var(--m-color-theme);
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-play {
          font-size: var(--m-font-size-medium-x);
          margin-right: 6px;
        }
        .text {
          font-size: var(--m-font-size-small);
        }
      }
    }
    .filter {
      background: rgba(7, 17, 27, 0.4);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .list {
    z-index: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    .song-list-wrapper {
      padding: 20px 30px;
      background: var(--m-color-background);
    }
  }
}
</style>
