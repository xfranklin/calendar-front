import Timeline from "@/pages/Timeline.vue";

export const AppRoutes = [
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    meta: {
      layout: "AppLayout",
      requireAuth: true
    }
  }
];
