<template>
  <scroll class="index-list">
    <ul>
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
  </scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
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
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: var(--m-font-size-small);
      color: var(--m-color-text-l);
      background-color: var(--m-color-highlight-background);
    }
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
}
</style>
