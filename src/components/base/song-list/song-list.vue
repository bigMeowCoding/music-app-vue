<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(item, index) in songs"
      @click="selectSong(item, index)"
    >
      <div class="rank"></div>
      <div class="content">
        <div class="name">{{ item.name }}</div>
        <div class="desc">{{ getDesc(item) }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "song-list",
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["selectSong"],
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`;
    },
    selectSong(item, index) {
      this.$emit("selectSong", { song: item, index });
    },
  },
};
</script>

<style scoped lang="scss">
.song-list {
  .item {
    height: 64px;
    display: flex;
    align-items: center;
    font-size: var(--m-font-size-medium);
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap();
        color: var(--m-color-text);
      }
      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: var(--m-color-text-d);
      }
    }
  }
}
</style>
