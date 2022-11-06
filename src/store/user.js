import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    authenticated: false,
    userInfo: null
  }),
  actions: {
    setAuthStatus(status) {
      this.authenticated = status;
    },
    setUserInfo(user) {
      this.userInfo = user;
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
    isOnboarded(state) {
      return state.userInfo?.isOnboarded || false;
    },
    getUserInfo(state) {
      return state.userInfo;
    }
  }
});
