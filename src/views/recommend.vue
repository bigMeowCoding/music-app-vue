<template>recommend</template>

<script>
export default {
  name: "recommend",
  async created() {
    const res = await getRecommend();
    console.log(res);
  },
};
</script>

<style scoped></style>
