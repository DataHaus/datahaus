import { createRouter, createWebHistory } from "vue-router";

const baseURL = "";

/* Async Components */
const HomeView = () => import("../views/HomeView.vue");

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop - 135,
        behavior: "smooth",
      });
    } else {
      return savedPosition || { top: 0, left: 0 };
    }
  },
  history: createWebHistory(baseURL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
