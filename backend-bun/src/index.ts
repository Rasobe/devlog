import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.routes";
import { postsRoutes } from "./modules/posts/posts.routes";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "DevLog API",
          version: "1.0.0",
          description: "API for DevLog blogging platform",
        },
      },
    }),
  )
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }))
  .group("/api/v1", (app) => app.use(authRoutes).use(postsRoutes))
  .listen(env.PORT);

console.log(`🦊 DevLog API running at http://localhost:${env.PORT}`);
console.log(`📖 Swagger docs at http://localhost:${env.PORT}/swagger`);
