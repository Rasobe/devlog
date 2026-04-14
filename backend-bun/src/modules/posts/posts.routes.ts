import { Elysia, t } from "elysia";
import { postsService } from "./posts.service";
import { authPlugin } from "@/plugins/auth.plugin";

// --- Body Schemas ---

const createPostBody = t.Object({
  title: t.String(),
  content: t.String(),
  excerpt: t.String(),
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
  // Public routes
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
  // Protected routes
  .use(authPlugin)
  .post(
    "/",
    async ({ body, user, set }) => {
      try {
        return await postsService.create({ ...body, authorId: user!.id });
      } catch {
        set.status = 400;
        return { message: "Could not create post" };
      }
    },
    {
      body: createPostBody,
      requireAuth: true,
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
      requireAuth: true,
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
    {
      requireAuth: true,
      detail: { summary: "Delete a post" },
    },
  )
  .put(
    "/slug/:slug/tags/:tagSlug",
    async ({ params: { slug: postSlug, tagSlug }, set }) => {
      try {
        return await postsService.addTag(postSlug, tagSlug);
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not add tag to post",
        };
      }
    },
    {
      requireAuth: true,
      detail: { summary: "Add a tag to a post" },
    },
  )
  .delete(
    "/slug/:slug/tags/:tagSlug",
    async ({ params: { slug: postSlug, tagSlug }, set }) => {
      try {
        return await postsService.removeTag(postSlug, tagSlug);
      } catch (e: unknown) {
        set.status = 404;
        return {
          message: e instanceof Error ? e.message : "Could not remove tag from post",
        };
      }
    },
    {
      requireAuth: true,
      detail: { summary: "Remove a tag from a post" },
    },
  );
