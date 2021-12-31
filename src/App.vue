<template>
  <m-header />
  <Tab />
  <router-view />
</template>

<style lang="scss"></style>
<script>
import MHeader from "@/components/header/header";
import Tab from "@/components/tab/tab";

export default {
  components: { MHeader, Tab },
};
</script>
