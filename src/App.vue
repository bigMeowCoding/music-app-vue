<template>
  <div>{{ num }}</div>
  <Header />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Header from "@/components/header/header.vue";
export default defineComponent({
  components: { Header },
});
</script>
