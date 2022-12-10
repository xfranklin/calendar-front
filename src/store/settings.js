import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    inited: false,
    colorMode: null,
    sideBarOpened: false
  }),
  actions: {
    setColorMode(mode) {
      this.colorMode = mode;
    },
    setInitStatus(status) {
      this.inited = status;
    },
    setSideBarStatus(status) {
      this.sideBarOpened = status;
    }
  },
  getters: {
    isDarkMode: (state) => state.colorMode === "DARK",
    isInited: (state) => state.inited,
    isSidebarOpened: (state) => state.sideBarOpened
  }
});
