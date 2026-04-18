import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.routes";
import { postsRoutes } from "./modules/posts/posts.routes";
import { categoriesRoutes } from "./modules/categories/categories.routes";
import { tagsRoutes } from "./modules/tags/tags.routes";
import { userRoutes } from "./modules/users/users.routes";
import { statsRoutes } from "./modules/stats/stats.routes";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    }),
  )
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
  .group("/api/v1", (app) =>
    app
      .use(authRoutes)
      .use(postsRoutes)
      .use(categoriesRoutes)
      .use(tagsRoutes)
      .use(userRoutes)
      .use(statsRoutes),
  )
  .listen(env.PORT);

console.log(`🦊 DevLog API running at http://localhost:${env.PORT}`);
console.log(`📖 Swagger docs at http://localhost:${env.PORT}/swagger`);
