import Elysia from "elysia";
import { userService } from "./users.service";
import { isAuthenticated } from "@/plugins/auth.plugin";
import {
  updateMeSchema,
  updateMePassword,
  userPublicSchema,
  userPrivateSchema,
} from "./users.schemas";
import { errorSchema } from "@/shared/schemas";

export const userRoutes = new Elysia({
  prefix: "/users",
  tags: ["Users"],
})
  // --- Public ---
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
    {
      response: {
        200: userPublicSchema,
        404: errorSchema,
      },
      detail: { summary: "Get public user profile", operationId: "getPublicUserById" },
    },
  )
  // --- Protected ---
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
    {
      response: {
        200: userPrivateSchema,
        404: errorSchema,
      },
      detail: { summary: "Get current user profile", operationId: "getMe" },
    },
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
      response: {
        200: userPrivateSchema,
        400: errorSchema,
      },
      detail: { summary: "Update current user profile", operationId: "updateMe" },
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
      response: {
        200: userPrivateSchema,
        400: errorSchema,
      },
      detail: { summary: "Update current user password", operationId: "updateMePassword" },
    },
  );
