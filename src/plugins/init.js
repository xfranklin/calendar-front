import { useServices } from "@/composables/useServices";

export const initPlugin = {
  async install() {
    const $services = useServices();
    const colorMode = window.localStorage.getItem("COLOR_MODE");

    const isSet = $services.settings.setColorMode(colorMode);
    if (!isSet) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        $services.settings.setColorMode("DARK");
        return;
      }
      $services.settings.setColorMode("LIGHT");
    }
  }
};
