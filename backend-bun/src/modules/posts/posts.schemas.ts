import { t } from "elysia";

export const createPostBody = t.Object({
  title: t.String(),
  content: t.String(),
  excerpt: t.String(),
  published: t.Optional(t.Boolean()),
  categoryId: t.Optional(t.Nullable(t.String())),
});

export const updatePostBody = t.Object({
  title: t.Optional(t.String()),
  slug: t.Optional(t.String()),
  content: t.Optional(t.String()),
  excerpt: t.Optional(t.String()),
  published: t.Optional(t.Boolean()),
  categoryId: t.Optional(t.Nullable(t.String())),
});

export const postsQuery = t.Object({
  page: t.Optional(t.String()),
  limit: t.Optional(t.String()),
  search: t.Optional(t.String()),
  category: t.Optional(t.String()),
  tag: t.Optional(t.String()),
  published: t.Optional(t.String()),
});
