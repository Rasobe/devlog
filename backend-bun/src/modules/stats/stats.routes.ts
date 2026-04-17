import Elysia from "elysia";
import { statsService } from "./stats.service";
import { isAuthenticated } from "@/plugins/auth.plugin";

export const statsRoutes = new Elysia({ prefix: "/stats", tags: ["Stats"] })
  // ── Protected ─────────────────────────────────────────────────────────────
  .use(isAuthenticated)
  .get(
    "/",
    async ({ user, set }) => {
      try {
        return await statsService.getUserStats(user.id);
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not fetch stats",
        };
      }
    },
    { detail: { summary: "Get stats for current user" } },
  );
