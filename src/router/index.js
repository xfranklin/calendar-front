import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";
import { useSettingsStore } from "@/store/settings";
import { useServices } from "@/composables/useServices";
import Login from "@/pages/Login.vue";
import SignUp from "@/pages/SignUp.vue";
import Reset from "@/pages/Reset.vue";
import Secret from "@/pages/Secret.vue";
import UiKit from "@/pages/UiKit.vue";

const routes = [
  {
    path: "/",
    name: "Root"
  },
  {
    path: "/ui-kit",
    name: "UiKit",
    component: UiKit
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      layout: "EmptyLayout",
      requireAuth: false
    }
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
    meta: {
      layout: "EmptyLayout",
      requireAuth: false
    }
  },
  {
    path: "/secret",
    name: "Secret",
    component: Secret,
    meta: {
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
    await $services.authService.refresh();
    settings.isInited = true;
  }
  if (to.meta.requireAuth && !user.isAuthenticated) {
    next({ name: "Login" });
  } else if (!to.meta.requireAuth && user.isAuthenticated) {
    next({ name: "Secret" });
  } else {
    next();
  }
});
