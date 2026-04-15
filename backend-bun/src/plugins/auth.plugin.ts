import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { env } from "@/config/env";

export const authPlugin = new Elysia({ name: "auth-plugin" })
  .use(
    jwt({
      name: "jwt",
      secret: env.JWT_SECRET,
    }),
  )
  .derive({ as: "global" }, async ({ jwt, headers }) => {
    const authorization = headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return { user: null };
    }

    const token = authorization.slice(7);
    const payload = await jwt.verify(token);

    if (!payload) {
      return { user: null };
    }

    return {
      user: {
        id: payload.id as string,
        email: payload.email as string,
        role: payload.role as "AUTHOR" | "ADMIN",
      },
    };
  });

export const isAuthenticated = new Elysia({ name: "is-authenticated" })
  .use(authPlugin)
  .onBeforeHandle({ as: "scoped" }, ({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { message: "Unauthorized" };
    }
  })
  .derive({ as: "scoped" }, ({ user }) => ({
    user: user as NonNullable<typeof user>,
  }));

export const isAdmin = new Elysia({ name: "is-admin" })
  .use(authPlugin)
  .onBeforeHandle({ as: "scoped" }, ({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { message: "Unauthorized" };
    }
    if (user.role !== "ADMIN") {
      set.status = 403;
      return { message: "Forbidden" };
    }
  })
  .derive({ as: "scoped" }, ({ user }) => ({
    user: user as NonNullable<typeof user>,
  }));
