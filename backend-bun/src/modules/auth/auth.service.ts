import { db } from "@/db";
import { users } from "@/db/schema";
import { hash, verify } from "@node-rs/bcrypt";
import { eq } from "drizzle-orm";
import type { AuthUser } from "./auth.types";
import { resolveUniqueUsername } from "./auth.helpers";

export const authService = {
  register: async (
    email: string,
    password: string,
    displayName: string,
  ): Promise<AuthUser> => {
    const existing = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existing) {
      throw new Error("Email already in use");
    }

    const username = await resolveUniqueUsername(displayName);
    const passwordHash = await hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({ email, username, passwordHash, displayName })
      .returning({
        id: users.id,
        email: users.email,
        displayName: users.displayName,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    if (!user) throw new Error("Failed to create user");

    return user;
  },

  login: async (email: string, password: string): Promise<AuthUser> => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await verify(password, user.passwordHash);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
