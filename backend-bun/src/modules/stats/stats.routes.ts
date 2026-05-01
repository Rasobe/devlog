import { statsService } from "./stats.service";
import { isAuthenticated } from "@/plugins/auth.plugin";
import {
  userStatsResponseSchema,
  activityParamsSchema,
  monthlyPostCountSchema,
} from "./stats.schema";
import { errorSchema } from "@/shared/schemas";
import Elysia, { t } from "elysia";

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
      detail: {
        summary: "Get stats for current user",
        operationId: "getMyStats",
      },
    },
  )
  .get(
    "/activity/:period",
    async ({ user, params: { period }, set }) => {
      try {
        const activity = await statsService.getActivityByPeriod(
          user.id,
          period,
        );
        set.status = 200;
        return activity;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not fetch activity",
        };
      }
    },
    {
      params: activityParamsSchema,
      response: {
        200: t.Array(monthlyPostCountSchema),
        400: errorSchema,
      },
      detail: {
        summary: "Get activity for current user by period",
        operationId: "getActivity",
      },
    },
  );
