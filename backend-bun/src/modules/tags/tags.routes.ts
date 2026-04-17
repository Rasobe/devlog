import Elysia from "elysia";
import { isAdmin } from "@/plugins/auth.plugin";
import { tagsService } from "./tags.service";
import { createTagBody, updateTagBody } from "./tags.schemas";

// --- Routes ---

export const tagsRoutes = new Elysia({
  prefix: "/tags",
  tags: ["Tags"],
})
  // ── Public ────────────────────────────────────────────────────────────────
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
  // ── Admin only ────────────────────────────────────────────────────────────
  .use(isAdmin)
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
      detail: { summary: "Create a new tag (admin)" },
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
      detail: { summary: "Update a tag (admin)" },
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
      detail: { summary: "Delete a tag (admin)" },
    },
  );
