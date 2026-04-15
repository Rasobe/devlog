// src/routes/users.routes.ts
import Elysia from "elysia";
import { userService } from "./users.service";
import { authPlugin } from "@/plugins/auth.plugin";

export const userRoutes = new Elysia({
  prefix: "/users",
  tags: ["Users"],
})
  .group("/me", (app) =>
    app.use(authPlugin).get("/", async ({ user, set }) => {
      try {
        if (!user) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        const privateData = await userService.findPrivateById(user.id);
        return privateData;
      } catch {
        set.status = 404;
        return { message: "User not found" };
      }
    }),
  )

  .get("/:userId", async ({ params: { userId }, set }) => {
    try {
      const publicData = await userService.findPublicById(userId);
      return publicData;
    } catch {
      set.status = 404;
      return { message: "User not found" };
    }
  });
