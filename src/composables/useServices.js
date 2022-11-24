import { Injector } from "@/dependency-injection/injector";
import { AUTH_SERVICE_TOKEN, SETTINGS_SERVICE_TOKEN, USER_SERVICE_TOKEN } from "@/services/tokens";

const SERVICES = {};

export const useServices = () => {
  if (Object.keys(SERVICES).length === 0) {
    SERVICES.auth = Injector.getDependency(AUTH_SERVICE_TOKEN);
    SERVICES.settings = Injector.getDependency(SETTINGS_SERVICE_TOKEN);
    SERVICES.user = Injector.getDependency(USER_SERVICE_TOKEN);
  }
  return SERVICES;
};
