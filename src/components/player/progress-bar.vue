<template>
  <div class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const btnWidth = 16;
export default {
  name: "progress-bar",
  props: {
    progress: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  emits: ["progress-changing", "progress-changed"],
  data() {
    return {
      offset: 0,
    };
  },
  created() {
    this.touch = {};
  },
  methods: {
    onTouchStart(e) {
      this.touch.x1 = e.touches[0].pageX;
      this.touch.beginWidth = this.$refs.progress.clientWidth;
    },
    onTouchMove(e) {
      const delta = e.touches[0].pageX - this.touch.x1;
      const temp = this.touch.beginWidth + delta;
      const barWidth = this.$el.clientWidth - btnWidth;
      const progress = Math.min(Math.max(temp / barWidth, 0), 1);
      this.$emit("progress-changing", progress);
    },
    onTouchEnd() {
      const barWidth = this.$el.clientWidth - btnWidth;
      const progress = this.$refs.progress.clientWidth / barWidth;
      this.$emit("progress-changed", progress);
    },
    onClick(e) {
      const client = this.$el.getBoundingClientRect();
      const delta = e.pageX - client.left;
      const progress = delta / (this.$el.clientWidth - btnWidth);
      this.$emit("progress-changed", progress);
    },
  },
  computed: {
    progressStyle() {
      return {
        width: `${this.offset}px`,
      };
    },
    btnStyle() {
      return `transform:translate3d(${this.offset}px,0,0)`;
    },
  },
  watch: {
    progress(newValue) {
      this.offset = (this.$el.clientWidth - btnWidth) * newValue;
    },
  },
};
</script>

<style scoped lang="scss">
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background-color: var(--m-color-theme);
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid var(--m-color-text);
        border-radius: 50%;
        background: var(--m-color-theme);
      }
    }
  }
}
</style>
