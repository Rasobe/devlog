import { t } from "elysia";

// --- Input Schemas ---
export const createPostBody = t.Object({
  title: t.String({ maxLength: 60 }),
  content: t.String(),
  excerpt: t.String(),
  published: t.Optional(t.Boolean()),
  categorySlug: t.Optional(t.String()),
  tagSlugs: t.Optional(t.Array(t.String())),
});

export const updatePostBody = t.Object({
  title: t.Optional(t.String({ maxLength: 60 })),
  content: t.Optional(t.String()),
  excerpt: t.Optional(t.String()),
  published: t.Optional(t.Boolean()),
  categorySlug: t.Optional(t.Optional(t.String())),
  tagSlugs: t.Optional(t.Array(t.String())),
});

export const postsQuery = t.Object({
  page: t.Optional(t.String()),
  limit: t.Optional(t.String()),
  search: t.Optional(t.String()),
  category: t.Optional(t.String()),
  tag: t.Optional(t.String()),
  published: t.Optional(t.Boolean()),
});

// --- Response Schemas ---
const authorSchema = t.Object({
  displayName: t.String(),
  email: t.String(),
});

const categorySchema = t.Object({
  name: t.String(),
  slug: t.String(),
});

const tagSchema = t.Object({
  tag: t.Object({
    id: t.String(),
    name: t.String(),
    slug: t.String(),
  }),
});

export const postSchema = t.Object({
  title: t.String(),
  slug: t.String(),
  content: t.String(),
  excerpt: t.String(),
  published: t.Boolean(),
  views: t.Number(),
  createdAt: t.String(),
  updatedAt: t.String(),
  author: authorSchema,
  category: t.Optional(categorySchema),
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

export const postTagResponseSchema = t.Object({
  postSlug: t.String(),
  tagSlug: t.String(),
});
