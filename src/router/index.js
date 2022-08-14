import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";
import { useSettingsStore } from "@/store/settings";
import { useServices } from "@/composables/useServices";
import { AuthRoutes } from "./auth.js";
import UiKit from "@/pages/UiKit.vue";
import Dashboard from "@/pages/Dashboard.vue";

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
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
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
  const settings = useSettingsStore();

  if (!settings.isInited) {
    const $services = useServices();
    await $services.auth.refresh();
    settings.isInited = true;
  }

  if (to.meta.open) {
    next();
  } else if (to.meta.requireAuth && !user.isAuthenticated) {
    next({ name: "SignUp" });
  } else if (user.isAuthenticated && !user.isOnboarded && to.name !== "Onboarding") {
    next({ name: "Onboarding" });
  } else if (user.isAuthenticated && user.isOnboarded && (to.name === "Onboarding" || !to.meta.requireAuth)) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});
