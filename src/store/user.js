import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    authenticated: false,
    userInfo: null,
    entrypoints: null
  }),
  actions: {
    setAuthStatus(status) {
      this.authenticated = status;
    },
    setUserInfo(user) {
      this.userInfo = user;
    },
    setEntrypoints(entrypoints) {
      this.entrypoints = entrypoints;
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
    },
    getEntrypoints(state) {
      return state.entrypoints;
    }
  }
});
