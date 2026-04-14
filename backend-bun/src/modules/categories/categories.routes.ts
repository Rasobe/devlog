import { Elysia, t } from "elysia";
import { authPlugin } from "@/plugins/auth.plugin";
import { categoriesService } from "./categories.service";

// --- Body Schemas ---

const createCategoryBody = t.Object({
  name: t.String(),
});

const updateCategoryBody = t.Object({
  name: t.Optional(t.String()),
});

// --- Routes ---

export const categoriesRoutes = new Elysia({
  prefix: "/categories",
  tags: ["Categories"],
})
  // Public routes
  .get("/", () => categoriesService.findAll(), {
    detail: { summary: "Get all categories" },
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
    { detail: { summary: "Get category by slug" } },
  )
  // Protected routes
  .use(authPlugin)
  .post(
    "/",
    async ({ body, set }) => {
      try {
        return await categoriesService.create(body);
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not create category",
        };
      }
    },
    {
      body: createCategoryBody,
      requireAuth: true,
      detail: { summary: "Create a new category" },
    },
  )
  .patch(
    "/:slug",
    async ({ params: { slug }, body, set }) => {
      try {
        const updated = await categoriesService.update(slug, body);
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
      requireAuth: true,
      detail: { summary: "Update a category" },
    },
  )
  .delete(
    "/:slug",
    async ({ params: { slug }, set }) => {
      try {
        const deleted = await categoriesService.delete(slug);
        return deleted;
      } catch (e: unknown) {
        set.status = 404;
        return {
          message:
            e instanceof Error ? e.message : "Could not delete category",
        };
      }
    },
    {
      requireAuth: true,
      detail: { summary: "Delete a category" },
    },
  );
