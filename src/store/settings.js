import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    inited: false,
    colorMode: "",
    sideBardOpened: false
  }),
  actions: {
    setColorMode(mode) {
      this.colorMode = mode;
    },
    setInitStatus(status) {
      this.inited = status;
    },
    setSideBarStatus(status) {
      this.sideBardOpened = status;
    }
  },
  getters: {
    isDarkMode: (state) => state.colorMode === "DARK",
    isInited: (state) => state.inited,
    isSidebarOpened: (state) => state.sideBardOpened
  }
});
