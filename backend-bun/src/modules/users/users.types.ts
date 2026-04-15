import { users } from "@/db/schema";

export type User = typeof users.$inferSelect;

export type UserPrivate = Omit<User, "passwordHash">;

export type UserPublic = Omit<User, "passwordHash" | "email" | "role">;
