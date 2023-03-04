import { createApp } from "vue";
import { addClass, removeClass } from "@/assets/js/dom";

export function createLoadingLikeDirective(component) {
  const relativeCls = "g-relative";
  const name = component.name;

  function append(el) {
    const style = getComputedStyle(el);

    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
      addClass(el, relativeCls);
    }
    el.appendChild(el[name].instance.$el);
  }
  function remove(el) {
    removeClass(el, relativeCls);
    el.removeChild(el[name].instance.$el);
  }
  return {
    mounted(el, binding) {
      if(typeof window ==='undefined') {
        return
      }
      const div = document?.createElement("div");
      if (!el[name]) {
        el[name] = {};
      }
      el[name].instance = createApp(component).mount(div);
      const val = binding.value;
      const arg = binding.arg;
      if (typeof arg !== "undefined") {
        el[name].instance.setTitle(arg);
      }
      if (val) {
        append(el);
      }
    },
    updated(el, binding) {
      const val = binding.value,
        oldValue = binding.oldValue;
      if (typeof binding.arg !== "undefined") {
        el[name].instance.setTitle(binding.arg);
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
}
