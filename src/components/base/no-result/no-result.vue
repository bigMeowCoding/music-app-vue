<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <div class="text">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "no-result",
  data() {
    return {
      title: "抱歉，没有结果",
    };
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style scoped lang="scss">
.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .no-result-content {
    text-align: center;
    .icon {
      width: 86px;
      height: 90px;
      margin: 0 auto;
      @include bg-image("no-result");
      background-size: 86px 90px;
    }
    .text {
      margin-top: 30px;
      font-size: var(--m-font-size-medium);
      color: var(--m-color-text-d);
    }
  }
}
</style>
