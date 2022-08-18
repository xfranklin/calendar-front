import { Injector } from "@/dependency-injection/injector";
import { useUserStore } from "@/store/user";
import { HTTP_SERVICE_TOKEN } from "@/services/tokens";
import { router } from "@/router";

export class AuthService {
  constructor() {
    this.$http = Injector.getDependency(HTTP_SERVICE_TOKEN);
    this.user = useUserStore();
    this.router = router;
  }

  async signUp(signUpData) {
    const response = await this.$http.post("/auth/signup", signUpData, true);
    if (response?.user) {
      this.user.setUserInfo(response.user);
      this.user.setAuthStatus(true);
      this.router.push({ name: "Dashboard" });
    }
    return response;
  }

  async getGoogleUrl() {
    return await this.$http.get(`/auth/social/google?redirect_uri=${import.meta.env.VITE_APP_URL}`);
  }

  async refresh() {
    const response = await this.$http.refresh();
    // to http service
    if (response?.message === "ACCESS_TOKEN_NOT_EXPIRED" || response?.status === 200) {
      this.user.setAuthStatus(true);
    } else {
      this.user.setAuthStatus(false);
      return response;
    }
  }
}
