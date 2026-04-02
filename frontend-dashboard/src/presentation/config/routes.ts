export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Dashboard (App)
  DASHBOARD: "/dashboard",

  // Posts
  POSTS_NEW: "/dashboard/posts/new",
  POSTS_EDIT: (slug: string) => `/dashboard/posts/${slug}/edit`,
  POSTS_VIEW: (slug: string) => `/posts/${slug}`,

  // Settings
  SETTINGS: "/dashboard/settings",
} as const;
