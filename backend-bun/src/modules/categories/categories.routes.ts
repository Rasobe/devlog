import { Elysia, t } from "elysia";
import { isAdmin } from "@/plugins/auth.plugin";
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
  // ── Public ────────────────────────────────────────────────────────────────
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
  // ── Admin only ────────────────────────────────────────────────────────────
  .use(isAdmin)
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
      detail: { summary: "Create a new category (admin)" },
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
      detail: { summary: "Update a category (admin)" },
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
          message: e instanceof Error ? e.message : "Could not delete category",
        };
      }
    },
    {
      detail: { summary: "Delete a category (admin)" },
    },
  );
