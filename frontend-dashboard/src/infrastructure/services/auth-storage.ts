import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "devlog_user";

export interface StoredUser {
  email: string;
  displayName: string;
}

export const authStorage = {
  getToken: (): string | null => {
    return Cookies.get(TOKEN_KEY) ?? null;
  },
  setToken: (token: string): void => {
    // 'strict' previene ataques CSRF. 
    // Usamos NODE_ENV === "production" para que 'secure' sea true solo en PROD (evita fallos HTTPS en localhost)
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  },
  removeToken: (): void => {
    Cookies.remove(TOKEN_KEY);
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
    Cookies.remove(TOKEN_KEY);
    // Limpiamos el guardado en localStorage también
    localStorage.clear();
  },
  isAuthenticated: (): boolean => {
    return !!authStorage.getToken();
  },
};
