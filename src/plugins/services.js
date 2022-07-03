import { Injector } from "@/dependency-injection/injector";
import { HttpService } from "@/services/http";
import { AuthService } from "@/services/auth.service";
import { HTTP_SERVICE_TOKEN, AUTH_SERVICE_TOKEN } from "@/services/tokens";

export const servicesPlugin = {
  install() {
    Injector.addDependency(new HttpService(), HTTP_SERVICE_TOKEN);
    Injector.addDependency(new AuthService(), AUTH_SERVICE_TOKEN);
  }
};
