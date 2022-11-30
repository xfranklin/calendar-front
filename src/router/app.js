import Timeline from "@/pages/Timeline.vue";
import Settings from "@/pages/Settings.vue";
import ChangePassword from "@/pages/ChangePassword.vue";

export const AppRoutes = [
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    meta: {
      layout: "AppLayout",
      requireAuth: true
    }
  },
  {
    path: "/boards",
    name: "Boards",
    component: Timeline,
    meta: {
      layout: "AppLayout",
      requireAuth: true
    }
  },
  {
    path: "/archive",
    name: "Archive",
    component: Timeline,
    meta: {
      layout: "AppLayout",
      requireAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      layout: "AppLayout",
      requireAuth: true
    }
  },
  {
    path: "/settings/change-password",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
      layout: "AppLayout",
      requireAuth: true
    }
  }
];
