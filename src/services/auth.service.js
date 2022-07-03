import { Injector } from "@/dependency-injection/injector";
import { useUserStore } from "@/store/user";
import { HTTP_SERVICE_TOKEN } from "@/services/tokens";

export class AuthService {
  constructor() {
    this.$http = Injector.getDependency(HTTP_SERVICE_TOKEN);
  }

  async signUp(signUpData) {
    return await this.$http.post("/auth/signup", signUpData);
  }

  async test() {
    return await this.$http.post("/user/user", { body: {} });
  }

  async getGoogleUrl() {
    return await this.$http.get("/auth/social/google");
  }

  async refresh() {
    const user = useUserStore();
    const response = await this.$http.refresh();
    // to http service
    if (response?.message === "ACCESS_TOKEN_NOT_EXPIRED" || response?.status === 200) {
      user.isAuthenticated = true;
    } else {
      user.isAuthenticated = false;
      return response;
    }
  }

  // async refresh() {
  //   const response = await this.$http.get("/auth/refresh");
  //   console.log("response", response);
  //   return response;
  // }
}
