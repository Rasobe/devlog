import { users } from "@/db/schema";

export type User = typeof users.$inferSelect;

export type UserPrivate = Omit<User, "passwordHash">;

export type UserPublic = Omit<User, "passwordHash" | "email" | "role">;

export interface UpdateUserInput {
  displayName?: string;
  username?: string;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}
