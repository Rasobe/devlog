import { t } from "elysia";

// --- Input ---
export const createTagBody = t.Object({
  name: t.String(),
});

export const updateTagBody = t.Object({
  name: t.Optional(t.String()),
});

// --- Output ---
export const tagResponseSchema = t.Object({
  name: t.String(),
  slug: t.String(),
});

export const tagsResponseSchema = t.Array(tagResponseSchema);
