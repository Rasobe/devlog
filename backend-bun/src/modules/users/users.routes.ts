import Elysia from "elysia";
import { userService } from "./users.service";
import { isAuthenticated } from "@/plugins/auth.plugin";

export const userRoutes = new Elysia({
  prefix: "/users",
  tags: ["Users"],
})
  // ── Public ────────────────────────────────────────────────────────────────
  .get(
    "/:userId",
    async ({ params: { userId }, set }) => {
      try {
        const publicData = await userService.findPublicById(userId);
        return publicData;
      } catch {
        set.status = 404;
        return { message: "User not found" };
      }
    },
    { detail: { summary: "Get public user profile" } },
  )
  // ── Protected ─────────────────────────────────────────────────────────────
  .use(isAuthenticated)
  .get(
    "/me",
    async ({ user, set }) => {
      try {
        const privateData = await userService.findPrivateById(user!.id);
        return privateData;
      } catch {
        set.status = 404;
        return { message: "User not found" };
      }
    },
    { detail: { summary: "Get current user profile" } },
  );
