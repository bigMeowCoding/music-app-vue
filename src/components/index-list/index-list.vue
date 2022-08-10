<template>
  <scroll ref="scrollRef" class="index-list" :probe-type="3" @scroll="onScroll">
    <ul ref="groupRef">
      <li class="group" v-for="group in data" :key="group.title">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            class="item"
            v-for="item in group.list"
            @click="onItemClick(item)"
          >
            <img class="avatar" :src="item.pic" alt="" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <div class="fixed-title">
        {{ fixedTitle }}
      </div>
    </div>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortCutTouchStart"
      @touchmove.stop.prevent="onShortCutTouchMove"
    >
      <ul>
        <li
          class="item"
          v-for="(item, index) in shortCutList"
          :data-index="index"
          :class="{ current: index === currentIndexRef }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
import { useFixed } from "@/components/index-list/useFixed";
import { useShortCut } from "@/components/index-list/useShortCut";
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
  emits: ["select"],
  setup(props, { emit }) {
    const { onScroll, groupRef, fixedTitle, currentIndexRef, fixedStyle } =
      useFixed(props);
    const {
      shortCutList,
      scrollRef,
      onShortCutTouchStart,
      onShortCutTouchMove,
    } = useShortCut(props, groupRef);
    function onItemClick(item) {
      emit("select", item);
    }
    return {
      onScroll,
      scrollRef,
      onItemClick,
      currentIndexRef,
      shortCutList,
      groupRef,
      onShortCutTouchStart,
      onShortCutTouchMove,
      fixedTitle,
      fixedStyle,
    };
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
    padding-bottom: 30px;
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
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--m-color-background-d);
    width: 20px;
    font-family: Helvetica;
    text-align: center;
    padding: 20px 0;
    border-radius: 10px;
    .item {
      color: var(--m-color-text-l);
      font-size: var(--m-font-size-small);
      padding: 3px;
      &.current {
        color: var(--m-color-theme);
      }
    }
  }
}
</style>
