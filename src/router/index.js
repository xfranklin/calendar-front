import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";
import { useServices } from "@/composables/useServices";
import { AuthRoutes } from "./auth.js";
import UiKit from "@/pages/UiKit.vue";
import Timeline from "@/pages/Timeline.vue";

const routes = [
  {
    path: "/",
    name: "Root",
    redirect: { name: "SignUp" }
  },
  ...AuthRoutes,
  {
    path: "/ui-kit",
    name: "UiKit",
    component: UiKit,
    meta: {
      layout: "EmptyLayout",
      open: true
    }
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    meta: {
      layout: "EmptyLayout",
      requireAuth: true
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
