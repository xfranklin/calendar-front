import { Injector } from "@/dependency-injection/injector";
import { AUTH_SERVICE_TOKEN } from "@/services/tokens";

export function useServices() {
  const authService = Injector.getDependency(AUTH_SERVICE_TOKEN);
  return {
    authService
  };
}
