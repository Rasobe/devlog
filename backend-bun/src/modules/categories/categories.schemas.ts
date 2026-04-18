import { t } from "elysia";

// --- Inputs ---
export const createCategoryBody = t.Object({
  name: t.String(),
});

export const updateCategoryBody = t.Object({
  name: t.Optional(t.String()),
});

// --- Outputs ---
export const categorySchema = t.Object({
  name: t.String(),
  slug: t.String(),
});

export const categoriesResponseSchema = t.Array(categorySchema);

export const categoryResponseSchema = categorySchema;
