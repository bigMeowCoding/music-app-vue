<template>
  <div class="recommend">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <slider v-if="sliders.length" :sliders="sliders" />
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in albums" :key="item.id">
              <div class="icon">
                <img :src="item.pic" width="60" height="60" alt="icon" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.username }}</h2>
                <p class="text">{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from "@/components/base/slider/slider";
import { getRecommend } from "@/service/recommend";
import Scroll from "@/components/base/scroll/scroll";
export default {
  name: "recommend",
  components: { Scroll, Slider },
  data() {
    return { sliders: [], albums: [] };
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
