<template>
  <div class="recommend" v-loading="loading">
    <scroll class="recommend-content" >
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in albums" :key="item.id">
              <div class="icon">
                <van-image
                  lazy-load
                  :src="item.pic"
                  width="60"
                  height="60"
                  alt="icon"
                />
              </div>
              <div class="text">
                <h2 class="name">{{ item.username }}</h2>
                <p class="text">{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <Poster />
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from "@/components/base/slider/slider";
import { getRecommend } from "@/service/recommend";
import Scroll from "@/components/base/scroll/scroll";
import { Button } from "vant";

export default {
  name: "recommend",
  components: { Scroll, Slider },
  computed: {
    loading() {
      return !this.sliders.length && !this.albums.length;
    },
  },
  data() {
    return {
      sliders: [],
      albums: [],
      loadingText:'加载哈。。。。。',
      [Button.name]: Button,
    };
  },
  async created() {
    const res = await getRecommend();
    this.sliders = res.sliders;
    this.albums = res.albums;
    console.log(res);
  },
};
</script>

<style lang="scss">
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  overflow: scroll;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      width: 100%;
      position: relative;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        font-size: var(--m-font-size-medium);
        color: var(--m-color-theme);
        text-align: center;
      }
      .item {
        display: flex;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex-basis: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-flow: column;
          justify-content: center;
          line-height: 20px;
          font-size: var(--m-font-size-medium);
          flex: 1;
          .name {
            margin-bottom: 20px;
            color: var(--m-color-text);
          }
          .text {
            color: var(--m-color-text-d);
          }
        }
      }
    }
  }
}
</style>
