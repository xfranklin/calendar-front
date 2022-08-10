import { useSettingsStore } from "@/store/settings";

export class SettingsService {
  constructor() {
    this.$settings = useSettingsStore();
  }

  setColorMode(colorMode) {
    const colorThemes = ["LIGHT", "DARK"];
    if (colorThemes.some((color) => color === colorMode)) {
      const html = document.documentElement;
      if (html) {
        colorThemes.forEach((element) => html.removeAttribute(element.toLowerCase()));
        window.localStorage.setItem("COLOR_MODE", colorMode);
        this.$settings.setColorMode(colorMode);
        html.setAttribute(colorMode.toLowerCase(), "");
        return true;
      }
    }
    return false;
  }
}
