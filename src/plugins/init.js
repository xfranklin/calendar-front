import { useSettingsStore } from "@/store/settings";

export const initPlugin = {
  async install() {
    const colorMode = window.localStorage.getItem("COLOR_MODE");
    const settings = useSettingsStore();
    if (colorMode) {
      settings.setColorMode(colorMode);
      if (colorMode === "LIGHT") {
        document.documentElement.removeAttribute("dark");
      } else if (colorMode === "DARK") {
        document.documentElement.setAttribute("dark", "");
      }
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        window.localStorage.setItem("COLOR_MODE", "DARK");
        settings.setColorMode("DARK");
        document.documentElement.setAttribute("dark", "");
      }
    }
  }
};
