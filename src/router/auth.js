import Login from "@/pages/Login.vue";
import SignUp from "@/pages/SignUp.vue";
import Reset from "@/pages/Reset.vue";

export const AuthRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AuthLayout",
      requireAuth: false
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      layout: "AuthLayout",
      requireAuth: false
    }
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
    meta: {
      layout: "AuthLayout",
      requireAuth: false
    }
  }
];
