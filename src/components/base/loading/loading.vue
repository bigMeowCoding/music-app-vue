<template>
  <div class="loading">
    <div class="loading-content">
      <van-loading type="spinner" />
      <p class="loading-desc">
        {{ title }}
      </p>
    </div>
  </div>
</template>

<script>
import { Loading } from "vant";

export default {
  name: "loading",
  components: {
    [Loading.name]: Loading,
  },
  data() {
    return { title: "正在加载" };
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    .loading-desc {
      line-height: 20px;
      font-size: var(--m-font-size-small);
      color: var(--m-color-text-l);
    }
  }
}
</style>
