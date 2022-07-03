import { createI18n } from "vue-i18n";
import en_US from "@/languages/en-US.json";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en-US",
  fallbackLocale: "en-US",
  messages: {
    "en-US": en_US
  }
});
