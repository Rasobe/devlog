import { Elysia, t } from "elysia";
import { postsService } from "./posts.service";

// --- Body Schemas ---

const createPostBody = t.Object({
  title: t.String(),
  slug: t.String(),
  content: t.String(),
  excerpt: t.String(),
  authorId: t.String(),
  published: t.Optional(t.Boolean()),
  categoryId: t.Optional(t.Nullable(t.String())),
});

const updatePostBody = t.Object({
  title: t.Optional(t.String()),
  slug: t.Optional(t.String()),
  content: t.Optional(t.String()),
  excerpt: t.Optional(t.String()),
  published: t.Optional(t.Boolean()),
  categoryId: t.Optional(t.Nullable(t.String())),
});

// --- Routes ---

export const postsRoutes = new Elysia({ prefix: "/posts", tags: ["Posts"] })
  .get("/", () => postsService.findAll(), {
    detail: { summary: "Get all posts" },
  })
  .get(
    "/slug/:slug",
    async ({ params: { slug }, set }) => {
      const post = await postsService.findBySlug(slug);
      if (!post) {
        set.status = 404;
        return { message: "Post not found" };
      }
      return post;
    },
    { detail: { summary: "Get post by slug" } },
  )
  .get(
    "/:id",
    async ({ params: { id }, set }) => {
      const post = await postsService.findById(id);
      if (!post) {
        set.status = 404;
        return { message: "Post not found" };
      }
      return post;
    },
    { detail: { summary: "Get post by ID" } },
  )
  .post(
    "/",
    async ({ body, set }) => {
      try {
        return await postsService.create(body);
      } catch {
        set.status = 400;
        return { message: "Could not create post" };
      }
    },
    {
      body: createPostBody,
      detail: { summary: "Create a new post" },
    },
  )
  .patch(
    "/:id",
    async ({ params: { id }, body, set }) => {
      const updated = await postsService.update(id, body);
      if (!updated) {
        set.status = 404;
        return { message: "Post not found" };
      }
      return updated;
    },
    {
      body: updatePostBody,
      detail: { summary: "Update a post" },
    },
  )
  .delete(
    "/:id",
    async ({ params: { id }, set }) => {
      const deleted = await postsService.delete(id);
      if (!deleted) {
        set.status = 404;
        return { message: "Post not found" };
      }
      return deleted;
    },
    { detail: { summary: "Delete a post" } },
  );
