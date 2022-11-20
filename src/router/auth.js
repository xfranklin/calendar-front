import Login from "@/pages/auth/Login.vue";
import SignUp from "@/pages/auth/SignUp.vue";
import Reset from "@/pages/auth/Reset.vue";
import Onboarding from "@/pages/auth/Onboarding.vue";
import Forgot from "@/pages/auth/Forgot.vue";

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
    path: "/reset-password",
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
  },
  {
    path: "/forgot-password",
    name: "Forgot",
    component: Forgot,
    meta: {
      layout: "AuthLayout",
      requireAuth: false
    }
  }
];
