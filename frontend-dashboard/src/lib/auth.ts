const TOKEN_KEY = "devlog_token";
const USER_KEY = "devlog_user";

export interface StoredUser {
  email: string;
  displayName: string;
}

export const authStorage = {
  getToken: (): string | null => {
    if (globalThis.window === undefined) return null; // guard SSR
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
  getUser: (): StoredUser | null => {
    if (globalThis.window === undefined) return null; // guard SSR
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: StoredUser): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },
  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  isAuthenticated: (): boolean => {
    return !!authStorage.getToken();
  },
};
