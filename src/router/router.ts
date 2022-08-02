import recommend from "@/views/recommend.vue";
import singer from "@/views/singer.vue";
import topList from "@/views/top-list.vue";
import search from "@/views/search.vue";
import * as VueRouter from "vue-router";
const routes = [
  // dynamic segments start with a colon
  { path: "/", redirect: "/recommend" },

  { path: "/recommend", component: recommend },
  { path: "/singer", component: singer },
  { path: "/top-list", component: topList },
  { path: "/search", component: search },
];
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
