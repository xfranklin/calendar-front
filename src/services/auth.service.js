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

    // FIX FOR WRONG DRAWING NOTIFICATION
    await new Promise((response) =>
      setTimeout(() => {
        response();
      }, 50)
    );

    const response = await this.$http.refresh();
    if (response?.message === "ACCESS_TOKEN_NOT_EXPIRED" || response?.status === 200) {
      this.user.setAuthStatus(true);
      const user = await this.me();
      this.user.setUserInfo(user);
      await this.getEntrypoints();
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
      await this.getEntrypoints();
      await this.router.push({ name: "Timeline" });
    }
    return response;
  }

  async signIn(signInData) {
    const response = await this.$http.post("/auth/login", signInData, true);
    if (response?.user) {
      this.user.setUserInfo(response.user);
      this.user.setAuthStatus(true);
      await this.getEntrypoints();
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
    const response = await this.$http.post("/auth/logout", {});
    if (response.status === 200) {
      this.user.$reset();
      await this.router.push({ name: "Login" });
    }
  }

  async me() {
    return await this.$http.get("/user/me");
  }

  async getEntrypoints() {
    const response = await this.$http.get("/user/entrypoints");
    this.user.setEntrypoints(response);
  }

  // TODO remove after response on real point
  async forgotPassword(forgotData) {
    // return await this.$http.post("/auth/forgot", forgotData, true);
    return new Promise((res) => {
      setTimeout(() => {
        console.log(forgotData);
        res(true);
      }, 500);
    });
  }

  // TODO remove after response on real point
  async resetPassword(data) {
    return new Promise((res) => {
      setTimeout(() => {
        console.log(data);
        res(true);
      }, 1500);
    });
  }
}
