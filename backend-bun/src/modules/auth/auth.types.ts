export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  role: "AUTHOR" | "ADMIN";
  createdAt: Date;
};
