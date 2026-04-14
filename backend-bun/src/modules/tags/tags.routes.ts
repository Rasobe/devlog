import { Elysia, t } from "elysia";
import { authPlugin } from "@/plugins/auth.plugin";
import { tagsService } from "./tags.service";

// --- Body Schemas ---

const createTagBody = t.Object({
  name: t.String(),
});

const updateTagBody = t.Object({
  name: t.Optional(t.String()),
});

// --- Routes ---

export const tagsRoutes = new Elysia({
  prefix: "/tags",
  tags: ["Tags"],
})
  // Public routes
  .get("/", () => tagsService.findAll(), {
    detail: { summary: "Get all tags" },
  })
  .get(
    "/:slug",
    async ({ params: { slug }, set }) => {
      const tag = await tagsService.findBySlug(slug);
      if (!tag) {
        set.status = 404;
        return { message: "Tag not found" };
      }
      return tag;
    },
    { detail: { summary: "Get tag by slug" } },
  )
  // Protected routes
  .use(authPlugin)
  .post(
    "/",
    async ({ body, set }) => {
      try {
        return await tagsService.create(body);
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not create tag",
        };
      }
    },
    {
      body: createTagBody,
      requireAuth: true,
      detail: { summary: "Create a new tag" },
    },
  )
  .patch(
    "/:slug",
    async ({ params: { slug }, body, set }) => {
      try {
        const updated = await tagsService.update(slug, body);
        return updated;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not update tag",
        };
      }
    },
    {
      body: updateTagBody,
      requireAuth: true,
      detail: { summary: "Update a tag" },
    },
  )
  .delete(
    "/:slug",
    async ({ params: { slug }, set }) => {
      try {
        const deleted = await tagsService.delete(slug);
        return deleted;
      } catch (e: unknown) {
        set.status = 404;
        return {
          message: e instanceof Error ? e.message : "Could not delete tag",
        };
      }
    },
    {
      requireAuth: true,
      detail: { summary: "Delete a tag" },
    },
  );
