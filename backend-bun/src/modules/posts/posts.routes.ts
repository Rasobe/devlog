import { Elysia, t } from "elysia";
import { postsService } from "./posts.service";
import { isAuthenticated } from "@/plugins/auth.plugin";

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
  // ── Public ────────────────────────────────────────────────────────────────
  .get(
    "/",
    async ({ query }) => {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const published =
        query.published === undefined ? undefined : query.published === "true";

      return postsService.findAll({
        page,
        limit,
        search: query.search,
        category: query.category,
        tag: query.tag,
        published,
      });
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
        search: t.Optional(t.String()),
        category: t.Optional(t.String()),
        tag: t.Optional(t.String()),
        published: t.Optional(t.String()),
      }),
      detail: { summary: "Get posts paginated" },
    },
  )
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
  // ── Protected (authenticated users) ───────────────────────────────────────
  .use(isAuthenticated)
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
      detail: { summary: "Create a new post" },
    },
  )
  .patch(
    "/slug/:slug",
    async ({ params: { slug }, body, set }) => {
      const updated = await postsService.update(slug, body);
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
    "/slug/:slug",
    async ({ params: { slug }, set }) => {
      const deleted = await postsService.delete(slug);
      if (!deleted) {
        set.status = 404;
        return { message: "Post not found" };
      }
      return deleted;
    },
    {
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
          message:
            e instanceof Error ? e.message : "Could not remove tag from post",
        };
      }
    },
    {
      detail: { summary: "Remove a tag from a post" },
    },
  );
