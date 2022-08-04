import { useSettingsStore } from "@/store/settings";

export class SettingsService {
  constructor() {
    this.$settings = useSettingsStore();
  }
}
