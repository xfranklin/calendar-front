import { useSettingsStore } from "@/store/settings";
export const initPlugin = {
  async install() {
    const settings = useSettingsStore();
  }
};
