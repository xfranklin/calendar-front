import { Injector } from "@/dependency-injection/injector";
import { AUTH_SERVICE_TOKEN, SETTINGS_SERVICE_TOKEN } from "@/services/tokens";

export const useServices = () => {
  const auth = Injector.getDependency(AUTH_SERVICE_TOKEN);
  const settings = Injector.getDependency(SETTINGS_SERVICE_TOKEN);

  console.log("fuck");

  return {
    auth,
    settings
  };
};
