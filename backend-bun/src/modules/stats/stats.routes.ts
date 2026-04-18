import Elysia from "elysia";
import { statsService } from "./stats.service";
import { isAuthenticated } from "@/plugins/auth.plugin";
import { userStatsResponseSchema } from "./stats.schema";
import { errorSchema } from "@/shared/schemas";

export const statsRoutes = new Elysia({ prefix: "/stats", tags: ["Stats"] })
  .use(isAuthenticated)
  .get(
    "/",
    async ({ user, set }) => {
      try {
        const stats = await statsService.getUserStats(user.id);
        set.status = 200;
        return stats;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not fetch stats",
        };
      }
    },
    {
      response: {
        200: userStatsResponseSchema,
        400: errorSchema,
      },
      detail: { summary: "Get stats for current user", operationId: "getMyStats" },
    },
  );
