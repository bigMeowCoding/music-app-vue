import recommend from "@/views/recommend.vue";
import singer from "@/views/singer.vue";
import topList from "@/views/top-list.vue";
import search from "@/views/search.vue";
import SingerDetail from "@/views/singer-detail.vue";

import * as VueRouter from "vue-router";
import { createMemoryHistory, createWebHistory } from "vue-router";
const routes = [
  // dynamic segments start with a colon
  { path: "/", redirect: "/recommend" },

  { path: "/recommend", component: recommend },
  {
    path: "/singer",
    component: singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  { path: "/top-list", component: topList },
  { path: "/search", component: search },
];

// @ts-ignore
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: import.meta.env.SSR
    ? createMemoryHistory("")
    : createWebHistory(""),
  routes, // short for `routes: routes`
});

export default router;
