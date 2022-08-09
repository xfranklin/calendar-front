import { SettingsService } from "@/services/settings.service.js";

export const initPlugin = {
  async install() {
    const $services = new SettingsService();
    const colorMode = window.localStorage.getItem("COLOR_MODE");

    if (colorMode) {
      $services.setColorMode(colorMode);
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        $services.setColorMode("DARK");
      }
    }
  }
};
