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
};
</script>

<style scoped></style>
