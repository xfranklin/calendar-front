import { Injector } from "@/dependency-injection/injector";
import { useUserStore } from "@/store/user";
import { HTTP_SERVICE_TOKEN } from "@/services/tokens";
import { $notification } from "@/components/base/feedback/notification/notification";
import { i18n } from "@/configs/i18n";
import { router } from "@/router";

export class UserService {
  constructor() {
    this.$http = Injector.getDependency(HTTP_SERVICE_TOKEN);
    this.user = useUserStore();
    this.router = router;
    this.notification = $notification;
    this.t = i18n.global.t;
  }

  async onboarding(onboardingData) {
    const response = await this.$http.post("/user/onboard", onboardingData);
    if (response.user) {
      this.user.setUserInfo(response.user);
      if (!response.user.isVerified) {
        this.notification({
          duration: "none",
          message: this.t("CONFIRM_EMAIL_SEND")
        });
      }
      await this.router.push({ name: "Timeline" });
    }
  }
}
