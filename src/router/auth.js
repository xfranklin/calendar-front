import Login from "@/pages/auth/Login.vue";
import SignUp from "@/pages/auth/SignUp.vue";
import Reset from "@/pages/auth/Reset.vue";
import Onboarding from "@/pages/auth/Onboarding.vue";

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
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: Onboarding,
    meta: {
      layout: "AuthLayout",
      requireAuth: true
    }
  }
];
