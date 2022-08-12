import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/index.scss";
import router from "@/router/router";
import defaultImage from "@/assets/images/default.png";
import { Lazyload } from "vant";
import { loadingDirective } from "@/components/base/loading/loading-directive";
import { noResultDirective } from "@/components/base/no-result/noResult-directive";
createApp(App)
  .use(router)
  .use(Lazyload, {
    loading: defaultImage,
  })
  .directive("loading", loadingDirective)
  .directive("no-result", noResultDirective)
  .mount("#app");
