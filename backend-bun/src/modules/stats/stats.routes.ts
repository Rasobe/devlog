import Elysia from "elysia";
import { statsService } from "./stats.service";
import { authPlugin } from "@/plugins/auth.plugin";

export const statsRoutes = new Elysia({ prefix: "/stats", tags: ["Stats"] })
  .use(authPlugin)
  .get("/", async ({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { message: "Unauthorized" };
    }
    const stats = await statsService.getUserStats(user.id);
    return stats;
  });
