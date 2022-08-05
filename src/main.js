import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/index.scss";
import router from "@/router/router";
import defaultImage from "@/assets/images/default.png";
import { Lazyload } from "vant";
createApp(App)
  .use(router)
  .use(Lazyload, {
    loading: defaultImage,
  })
  .mount("#app");
