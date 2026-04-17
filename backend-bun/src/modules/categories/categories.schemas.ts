import { t } from "elysia";

export const createCategoryBody = t.Object({
  name: t.String(),
});

export const updateCategoryBody = t.Object({
  name: t.Optional(t.String()),
});
