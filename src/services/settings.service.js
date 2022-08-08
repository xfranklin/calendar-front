import { useSettingsStore } from "@/store/settings";

export class SettingsService {
  constructor() {
    this.$settings = useSettingsStore();
  }

  setColorMode(colorMode) {
    const colorThemes = ["LIGHT", "DARK"];
    console.log(42);
    if (colorThemes.some((color) => color === colorMode)) {

      const html = document.documentElement;
      if (html) {
        colorThemes.forEach((element) => {
          if (element !== colorMode) {
            const attribute = element;
            html.removeAttribute(attribute.toLowerCase());
          }
        });
      }

      window.localStorage.setItem("COLOR_MODE", colorMode);
      this.$settings.setColorMode(colorMode);
      document.documentElement.setAttribute(colorMode.toLowerCase(), "");
      return true;
    }
    return false;
  }
}
