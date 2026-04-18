import { t } from "elysia";

// --- Input Schemas ---
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

// --- Response Schemas ---
const authorSchema = t.Object({
  displayName: t.String(),
  email: t.String(),
});

const categorySchema = t.Nullable(
  t.Object({
    name: t.String(),
    slug: t.String(),
  }),
);

const tagSchema = t.Object({
  tag: t.Object({
    id: t.String(),
    name: t.String(),
    slug: t.String(),
  }),
});

export const postSchema = t.Object({
  id: t.String(),
  title: t.String(),
  slug: t.String(),
  content: t.String(),
  excerpt: t.String(),
  published: t.Nullable(t.Boolean()),
  views: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  author: authorSchema,
  category: categorySchema,
  postTags: t.Array(tagSchema),
});

export const paginatedPostsSchema = t.Object({
  data: t.Array(postSchema),
  meta: t.Object({
    total: t.Number(),
    page: t.Number(),
    limit: t.Number(),
    totalPages: t.Number(),
  }),
});
