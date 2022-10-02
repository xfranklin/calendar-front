import { Injector } from "@/dependency-injection/injector";
import { AUTH_SERVICE_TOKEN, SETTINGS_SERVICE_TOKEN, USER_SERVICE_TOKEN } from "@/services/tokens";

export const useServices = () => {
  const auth = Injector.getDependency(AUTH_SERVICE_TOKEN);
  const settings = Injector.getDependency(SETTINGS_SERVICE_TOKEN);
  const user = Injector.getDependency(USER_SERVICE_TOKEN);

  return {
    auth,
    settings,
    user
  };
};
