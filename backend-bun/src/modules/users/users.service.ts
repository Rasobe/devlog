import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import {
  type UpdatePasswordInput,
  type UpdateUserInput,
  type UserPrivate,
  type UserPublic,
} from "./users.types";
import { toUserPrivate, toUserPublic } from "./users.helpers";

export const userService = {
  findPrivateById: async (id: string): Promise<UserPrivate> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new Error("User not found");
    }

    return toUserPrivate(user);
  },

  findPublicById: async (id: string): Promise<UserPublic> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new Error("User not found");
    }

    return toUserPublic(user);
  },

  updateMe: async (id: string, data: UpdateUserInput): Promise<UserPrivate> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (data.username?.length && data.username !== user.username) {
      const usernameRegex = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/;
      if (!usernameRegex.test(data.username)) {
        throw new Error(
          "Username can only contain lowercase letters, numbers and hyphens",
        );
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.username, data.username),
      });

      if (existingUser) {
        throw new Error("Username already taken");
      }
    }

    const [updated] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    if (!updated) throw new Error("Failed to update user");

    return toUserPrivate(updated);
  },

  updateMePassword: async (
    id: string,
    data: UpdatePasswordInput,
  ): Promise<UserPrivate> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) throw new Error("User not found");

    const isPasswordValid = await Bun.password.verify(
      data.currentPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const newPassword = await Bun.password.hash(data.newPassword, {
      algorithm: "bcrypt",
    });

    const [updated] = await db
      .update(users)
      .set({ passwordHash: newPassword })
      .where(eq(users.id, id))
      .returning();

    if (!updated) throw new Error("Failed to update password");

    return toUserPrivate(updated);
  },
};
