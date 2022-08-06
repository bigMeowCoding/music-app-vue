import { createApp } from "vue";
import loading from "@/components/base/loading/loading";
import { addClass, removeClass } from "@/assets/js/dom";
const relativeCls = "g-relative";
function append(el) {
  const style = getComputedStyle(el);

  if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
    addClass(el, relativeCls);
  }
  el.appendChild(el.instance.$el);
}
function remove(el) {
  removeClass(el, relativeCls);
  el.removeChild(el.instance.$el);
}
export const loadingDirective = {
  mounted(el, binding) {
    const div = document.createElement("div");
    el.instance = createApp(loading).mount(div);
    const val = binding.value;
    const arg = binding.arg;
    if (typeof arg !== "undefined") {
      el.instance.setTitle(arg);
    }
    if (val) {
      append(el);
    }
  },
  updated(el, binding) {
    const val = binding.value,
      oldValue = binding.oldValue;
    if (typeof binding.arg !== "undefined") {
      el.instance.setTitle(binding.arg);
    }

    if (oldValue !== val) {
      if (val) {
        append(el);
      } else {
        remove(el);
      }
    }
  },
};
