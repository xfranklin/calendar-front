import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuth: false,
    userInfo: null
  }),
  actions: {
    setAuthStatus(value) {
      this.isAuth = value;
    },
    setUserInfo(user) {
      this.userInfo = user;
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuth;
    },
    isOnboarded(state) {
      return state.userInfo?.isOnboarded || false;
    }
  }
});
