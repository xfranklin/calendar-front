import { onMounted } from "vue";
import { loadScript } from "@/utils/load-script";
const RECAPTCHA_URL = "https://www.google.com/recaptcha/api.js";

export const useRecaptcha = () => {
  const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;
  onMounted(async () => {
    await loadScript(`${RECAPTCHA_URL}?render=${RECAPTCHA_KEY}`);
  });

  const reCaptchaExecute = async () => {
    if (window.grecaptcha) {
      return await window.grecaptcha.execute(RECAPTCHA_KEY, { action: "submit" });
    }
  };

  return { reCaptchaExecute };
};
