import { createRouter, createWebHistory } from "vue-router";

/* Async Components */
const HomeView = () => import("../views/HomeView.vue");
const DashboardView = () => import("../views/DashboardView.vue");
const StorageView = () => import("../views/StorageView.vue");
const CodView = () => import("../views/CodView.vue");
const DealsView = () => import("../views/DealsView.vue");
const ReportsView = () => import("../views/ReportsView.vue");
const SettingsView = () => import("../views/SettingsView.vue");

const baseURL = "";

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
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/storage",
      name: "storage",
      component: StorageView,
    },
    {
      path: "/cod",
      name: "cod",
      component: CodView,
    },
    {
      path: "/deals",
      name: "deals",
      component: DealsView,
    },
    {
      path: "/reports",
      name: "reports",
      component: ReportsView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
  ],
});

export default router;
