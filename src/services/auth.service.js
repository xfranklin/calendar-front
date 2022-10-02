import { Injector } from "@/dependency-injection/injector";
import { useUserStore } from "@/store/user";
import { useSettingsStore } from "@/store/settings";
import { HTTP_SERVICE_TOKEN } from "@/services/tokens";
import { router } from "@/router";

export class AuthService {
  constructor() {
    this.$http = Injector.getDependency(HTTP_SERVICE_TOKEN);
    this.user = useUserStore();
    this.settings = useSettingsStore();
    this.router = router;
  }

  async init() {
    if (this.settings.isInited) return null;
    const response = await this.$http.refresh();
    if (response?.message === "ACCESS_TOKEN_NOT_EXPIRED" || response?.status === 200) {
      this.user.setAuthStatus(true);
      const user = await this.me();
      this.user.setUserInfo(user);
    } else {
      this.user.setAuthStatus(false);
    }
    this.settings.setInitStatus(true);
  }

  async signUp(signUpData) {
    const response = await this.$http.post("/auth/signup", signUpData, true);
    if (response?.user) {
      this.user.setUserInfo(response.user);
      this.user.setAuthStatus(true);
      await this.router.push({ name: "Timeline" });
    }
    return response;
  }

  async signIn(signInData) {
    const response = await this.$http.post("/auth/login", signInData, true);
    if (response?.user) {
      this.user.setUserInfo(response.user);
      this.user.setAuthStatus(true);
      await this.router.push({ name: "Timeline" });
    }
    return response;
  }

  async getGoogleUrl() {
    return await this.$http.get(`/auth/social/google?redirect_uri=${import.meta.env.VITE_APP_URL}`);
  }

  async getFacebookUrl() {
    return await this.$http.get(`/auth/social/facebook?redirect_uri=${import.meta.env.VITE_APP_URL}`);
  }

  async logout() {
    return await this.$http.post("/auth/logout", {});
  }

  async me() {
    return await this.$http.get("/user/me");
  }
}
