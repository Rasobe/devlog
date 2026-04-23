import { jwt } from "@elysiajs/jwt";
import { env } from "@/config/env";
import Elysia from "elysia";
import { authService } from "./auth.service";
import { registerBody, loginBody, authResponseSchema } from "./auth.schemas";
import { errorSchema } from "@/shared/schemas";

// --- Routes ---

export const authRoutes = new Elysia({ prefix: "/auth", tags: ["Auth"] })
  .use(
    jwt({
      name: "jwt",
      secret: env.JWT_SECRET,
      exp: "7d",
    }),
  )
  .post(
    "/register",
    async ({ body, jwt, set }) => {
      try {
        const user = await authService.register(
          body.email,
          body.password,
          body.displayName,
        );
        const token = await jwt.sign({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        set.status = 201;
        return {
          user: {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          token,
        };
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Registration failed",
        };
      }
    },
    {
      body: registerBody,
      response: {
        201: authResponseSchema,
        400: errorSchema,
      },
      detail: { summary: "Register a new user", operationId: "register" },
    },
  )
  .post(
    "/login",
    async ({ body, jwt, set }) => {
      try {
        const user = await authService.login(body.email, body.password);
        const token = await jwt.sign({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        set.status = 200;
        return {
          user: {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          token,
        };
      } catch (e: unknown) {
        set.status = 401;
        return { message: e instanceof Error ? e.message : "Login failed" };
      }
    },
    {
      body: loginBody,
      response: {
        200: authResponseSchema,
        401: errorSchema,
      },
      detail: {
        summary: "Login with email and password",
        operationId: "login",
      },
    },
  );
