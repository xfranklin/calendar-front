import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";
import { useServices } from "@/composables/useServices";
import { AuthRoutes } from "./auth.js";
import { AppRoutes } from "@/router/app";
import UiKit from "@/pages/UiKit.vue";

const routes = [
  {
    path: "/",
    name: "Root",
    redirect: { name: "SignUp" }
  },
  ...AuthRoutes,
  ...AppRoutes,
  {
    path: "/ui-kit",
    name: "UiKit",
    component: UiKit,
    meta: {
      layout: "EmptyLayout",
      open: true
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();
  const $services = useServices();

  await $services.auth.init();

  if (to.meta.open) {
    next();
  } else if (to.meta.requireAuth && !user.isAuthenticated) {
    next({ name: "SignUp" });
  } else if (user.isAuthenticated && !user.isOnboarded && to.name !== "Onboarding") {
    next({ name: "Onboarding" });
  } else if (user.isAuthenticated && user.isOnboarded && (to.name === "Onboarding" || !to.meta.requireAuth)) {
    next({ name: "Timeline" });
  } else {
    next();
  }
});
