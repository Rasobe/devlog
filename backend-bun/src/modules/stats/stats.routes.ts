import Elysia from "elysia";
import { statsService } from "./stats.service";
import { isAuthenticated } from "@/plugins/auth.plugin";

export const statsRoutes = new Elysia({ prefix: "/stats", tags: ["Stats"] })
  // ── Protected ─────────────────────────────────────────────────────────────
  .use(isAuthenticated)
  .get(
    "/",
    async ({ user }) => {
      return statsService.getUserStats(user!.id);
    },
    { detail: { summary: "Get stats for current user" } },
  );
