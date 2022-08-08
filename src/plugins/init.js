import { setColorMode } from "@/utils/settings-services.js";

export const initPlugin = {
  async install() {
    const colorMode = window.localStorage.getItem("COLOR_MODE");

    if (colorMode) {
      setColorMode(colorMode);
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setColorMode("DARK");
      }
    }
  }
};
