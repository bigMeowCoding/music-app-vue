<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import { useScroll } from "@/components/base/scroll/use-scroll";

export default {
  name: "scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    probeType: {
      type: Number,
      default: 0,
    },
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const rootRef = ref(null);
    const { scroll } = useScroll(rootRef, props, emit);
    return {
      rootRef,
      scroll,
    };
  },
};
</script>

<style scoped></style>
