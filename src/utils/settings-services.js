import { useSettingsStore } from "@/store/settings";

const colorThemes = ["LIGHT", "DARK"];

export function setColorMode(colorMode) {
  if (colorThemes.some((color) => color === colorMode)) {
    const settings = useSettingsStore();

    const html = document.documentElement;
    if (html) {
      html.removeAttribute("light");
      html.removeAttribute("dark");
    }

    window.localStorage.setItem("COLOR_MODE", colorMode);
    settings.setColorMode(colorMode);

    if (colorMode === "LIGHT") {
      document.documentElement.setAttribute("light", "");
    } else if (colorMode === "DARK") {
      document.documentElement.setAttribute("dark", "");
    }
    return true;
  }
  return false;
}
