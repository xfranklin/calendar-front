import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    isInited: false,
    colorMode: ""
  }),
  actions: {
    setColorMode(mode) {
      this.colorMode = mode;
    }
  },
  getters: {
    isDarkMode: (state) => (state.colorMode === "DARK" ? true : false)
  }
});
