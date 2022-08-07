<template>
  <scroll class="index-list" probe-type="2" @scroll="onScroll">
    <ul ref="groupRef">
      <li class="group" v-for="group in data" :key="group.title">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li class="item" v-for="item in group.list">
            <img class="avatar" :src="item.pic" alt="" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle">
      <div class="fixed-title">
        {{ fixedTitle }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
import { useFixed } from "@/components/index-list/useFixed";
export default {
  name: "index-list",
  components: { Scroll },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const { onScroll, groupRef, fixedTitle } = useFixed(props);
    return { onScroll, groupRef, fixedTitle };
  },
};
</script>

<style scoped lang="scss">
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--m-color-background);
  .group {
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: var(--m-color-text-l);
        font-size: var(--m-font-size-medium);
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .fixed .fixed-title,
  .group .title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: var(--m-font-size-small);
    color: var(--m-color-text-l);
    background-color: var(--m-color-highlight-background);
  }
}
</style>
