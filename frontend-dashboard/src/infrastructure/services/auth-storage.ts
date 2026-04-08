import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "devlog_user";

export interface StoredUser {
  email: string;
  displayName: string;
}

const AUTH_CHANGE_EVENT = "auth-change";

const notify = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
};

export const authStorage = {
  subscribe: (callback: () => void) => {
    window.addEventListener(AUTH_CHANGE_EVENT, callback);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  },
  getToken: (): string | null => {
    return Cookies.get(TOKEN_KEY) ?? null;
  },
  setToken: (token: string): void => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    notify();
  },
  removeToken: (): void => {
    Cookies.remove(TOKEN_KEY);
    notify();
  },
  getUser: (): StoredUser | null => {
    if (globalThis.window === undefined) return null; // guard SSR
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: StoredUser): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    notify();
  },
  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
    notify();
  },
  clear: (): void => {
    Cookies.remove(TOKEN_KEY);
    localStorage.clear();
    notify();
  },
  isAuthenticated: (): boolean => {
    return !!authStorage.getToken();
  },
};
