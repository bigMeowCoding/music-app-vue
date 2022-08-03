<template>
  <Header />
  <tab />
  <router-view></router-view>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
export default defineComponent({
  components: { Tab, Header },
});
</script>
