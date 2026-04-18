import Elysia from "elysia";
import { isAdmin } from "@/plugins/auth.plugin";
import { categoriesService } from "./categories.service";
import {
  categoriesResponseSchema,
  categoryResponseSchema,
  createCategoryBody,
  updateCategoryBody,
} from "./categories.schemas";
import { errorSchema } from "@/shared/schemas";

export const categoriesRoutes = new Elysia({
  prefix: "/categories",
  tags: ["Categories"],
})
  // --- Public ---
  .get("/", () => categoriesService.findAll(), {
    detail: { summary: "Get all categories" },
    response: {
      200: categoriesResponseSchema,
      404: errorSchema,
    },
  })
  .get(
    "/:slug",
    async ({ params: { slug }, set }) => {
      const category = await categoriesService.findBySlug(slug);
      if (!category) {
        set.status = 404;
        return { message: "Category not found" };
      }
      return category;
    },

    {
      response: {
        200: categoryResponseSchema,
        404: errorSchema,
      },
      detail: { summary: "Get category by slug" },
    },
  )

  // --- Admin only ---
  .use(isAdmin)
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const category = await categoriesService.create(body);
        set.status = 201;
        return category;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not create category",
        };
      }
    },
    {
      body: createCategoryBody,
      response: {
        201: categoryResponseSchema,
        400: errorSchema,
      },
      detail: { summary: "Create a new category (admin)" },
    },
  )
  .patch(
    "/:slug",
    async ({ params: { slug }, body, set }) => {
      try {
        const updated = await categoriesService.update(slug, body);

        if (!updated) {
          set.status = 404;
          return { message: "Category not found" };
        }

        return updated;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not update category",
        };
      }
    },
    {
      body: updateCategoryBody,
      response: {
        200: categoryResponseSchema,
        400: errorSchema,
        404: errorSchema,
      },
      detail: { summary: "Update a category (admin)" },
    },
  )
  .delete(
    "/:slug",
    async ({ params: { slug }, set }) => {
      try {
        const deleted = await categoriesService.delete(slug);

        if (!deleted) {
          set.status = 400;
          return { message: "Category not found" };
        }

        return deleted;
      } catch (e: unknown) {
        set.status = 404;
        return {
          message: e instanceof Error ? e.message : "Could not delete category",
        };
      }
    },
    {
      detail: { summary: "Delete a category (admin)" },
      response: {
        200: categoryResponseSchema,
        400: errorSchema,
        404: errorSchema,
      },
    },
  );
