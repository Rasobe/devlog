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
  .derive({ as: "scoped" }, async ({ jwt, headers }) => {
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
  })
  .macro({
    requireAuth: (enabled: boolean) => ({
      beforeHandle({ user, set }: any) {
        if (enabled && !user) {
          set.status = 401;
          return { message: "Unauthorized" };
        }
      },
    }),
  });
