import Elysia from "elysia";
import { userService } from "./users.service";
import { isAuthenticated } from "@/plugins/auth.plugin";
import { updateMeSchema, updateMePassword } from "./users.schemas";

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
        const privateData = await userService.findPrivateById(user.id);
        return privateData;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Failed to update user",
        };
      }
    },
    { detail: { summary: "Get current user profile" } },
  )
  .patch(
    "/me",
    async ({ user, set, body }) => {
      try {
        const privateData = await userService.updateMe(user.id, body);
        return privateData;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Failed to update user",
        };
      }
    },
    {
      body: updateMeSchema,
      detail: { summary: "Update current user profile" },
    },
  )
  .patch(
    "/me/password",
    async ({ user, set, body }) => {
      try {
        const privateData = await userService.updateMePassword(user.id, body);
        return privateData;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Failed to update password",
        };
      }
    },
    {
      body: updateMePassword,
      detail: { summary: "Update current user password" },
    },
  );
