import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  principal: string | null;
}

export function useAuth(): AuthState {
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && identity != null;
  const isLoading = loginStatus === "logging-in";

  return {
    isAuthenticated,
    isGuest: !isAuthenticated && !isLoading,
    isLoading,
    login,
    logout: clear,
    principal: identity?.getPrincipal().toText() ?? null,
  };
}
