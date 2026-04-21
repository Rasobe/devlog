export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Dashboard (App)
  DASHBOARD: "/dashboard",

  // Posts
  POSTS: "/dashboard/posts",
  POSTS_NEW: "/dashboard/posts/new",
  POSTS_PREVIEW: (id: string) => `/dashboard/posts/${id}/preview`,
  POSTS_EDIT: (id: string) => `/dashboard/posts/${id}/edit`,
  POSTS_VIEW: (slug: string) => `/posts/${slug}`,

  // Settings
  SETTINGS: "/dashboard/settings",
} as const;

export type AppRoute = {
  [K in keyof typeof ROUTES]: (typeof ROUTES)[K] extends string
    ? (typeof ROUTES)[K]
    : never;
}[keyof typeof ROUTES];
