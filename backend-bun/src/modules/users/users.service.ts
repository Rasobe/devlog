import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import type { UserPrivate, UserPublic } from "./users.types";

export const userService = {
  findPrivateById: async (id: string): Promise<UserPrivate> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        passwordHash: false,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  findPublicById: async (id: string): Promise<UserPublic> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        passwordHash: false,
        email: false,
        role: false,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
};
