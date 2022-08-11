<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle">
      <div class="play-btn-wrapper">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <scroll class="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" />
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from "@/components/base/song-list/song-list";
import Scroll from "@/components/base/scroll/scroll";
export default {
  name: "music-list",
  components: { Scroll, SongList },
  computed: {
    bgImageStyle() {
      return {
        backgroundImage: `url(${this.pic})`,
      };
    },
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
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
    height: 300px; // TODO
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
    top: 300px;
    z-index: 0;
    position: absolute;
    bottom: 60px;
    .song-list-wrapper {
      padding: 20px 30px;
      background: var(--m-color-background);
    }
  }
}
</style>
