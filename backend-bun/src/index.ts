import swagger from "@elysiajs/swagger";
import { timestamp } from "drizzle-orm/gel-core";
import Elysia, { status } from "elysia";
import { env } from "./config/env";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "DevLog API",
          version: "1.0.0",
          description: "API for DevLog bloging platform",
        },
      },
    }),
  )
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }))
  .listen(env.PORT);

console.log(`🦊 DevLog API running at http://localhost:${env.PORT}`);
console.log(`📖 Swagger docs at http://localhost:${env.PORT}/swagger`);
