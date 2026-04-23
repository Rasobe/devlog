import { users } from "@/db/schema";

export type User = typeof users.$inferSelect;

export type UserPrivate = Omit<User, "passwordHash" | "id" | "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type UserPublic = Omit<UserPrivate, "email" | "role">;

export interface UpdateUserInput {
  displayName?: string;
  username?: string;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}
