<template>
  <div>{{ num }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      num: 40,
    };
  },
  created() {
    axios.get("/api/getRecommend").then((d) => {
      console.log(d);
    });
  },
});
</script>
