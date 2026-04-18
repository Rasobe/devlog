import Elysia from "elysia";
import { isAdmin } from "@/plugins/auth.plugin";
import { tagsService } from "./tags.service";
import {
  createTagBody,
  tagResponseSchema,
  updateTagBody,
} from "./tags.schemas";
import { errorSchema } from "@/shared/schemas";

export const tagsRoutes = new Elysia({
  prefix: "/tags",
  tags: ["Tags"],
})
  // --- Public ---
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
    {
      response: {
        200: tagResponseSchema,
        404: errorSchema,
      },
      detail: { summary: "Get tag by slug" },
    },
  )
  // --- Admin only ---
  .use(isAdmin)
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const tag = await tagsService.create(body);
        set.status = 201;
        return tag;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not create tag",
        };
      }
    },
    {
      body: createTagBody,
      response: {
        201: tagResponseSchema,
        400: errorSchema,
      },
      detail: { summary: "Create a new tag (admin)" },
    },
  )
  .patch(
    "/:slug",
    async ({ params: { slug }, body, set }) => {
      try {
        const updated = await tagsService.update(slug, body);
        if (!updated) {
          set.status = 404;
          return { message: "Tag not found" };
        }
        set.status = 200;
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
      response: {
        200: tagResponseSchema,
        400: errorSchema,
        404: errorSchema,
      },
      detail: { summary: "Update a tag (admin)" },
    },
  )
  .delete(
    "/:slug",
    async ({ params: { slug }, set }) => {
      try {
        const deleted = await tagsService.delete(slug);
        if (!deleted) {
          set.status = 404;
          return { message: "Tag not found" };
        }
        set.status = 200;
        return deleted;
      } catch (e: unknown) {
        set.status = 404;
        return {
          message: e instanceof Error ? e.message : "Could not delete tag",
        };
      }
    },
    {
      response: {
        200: tagResponseSchema,
        400: errorSchema,
        404: errorSchema,
      },
      detail: { summary: "Delete a tag (admin)" },
    },
  );
