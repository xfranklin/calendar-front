import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    inited: false,
    colorMode: ""
  }),
  actions: {
    setColorMode(mode) {
      this.colorMode = mode;
    },
    setInitStatus(status) {
      this.inited = status;
    }
  },
  getters: {
    isDarkMode: (state) => state.colorMode === "DARK",
    isInited: (state) => state.inited
  }
});
