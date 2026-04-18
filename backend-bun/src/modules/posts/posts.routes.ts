import Elysia, { t } from "elysia";
import { postsService } from "./posts.service";
import { isAuthenticated } from "@/plugins/auth.plugin";
import {
  createPostBody,
  updatePostBody,
  postsQuery,
  paginatedPostsSchema,
  postSchema,
  postTagResponseSchema,
} from "./posts.schemas";
import { errorSchema } from "@/shared/schemas";

export const postsRoutes = new Elysia({ prefix: "/posts", tags: ["Posts"] })
  // --- Public ---
  .get(
    "/",
    async ({ query, set }) => {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const published =
        query.published === undefined ? undefined : query.published === "true";

      set.status = 200;

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
      query: postsQuery,
      response: {
        200: paginatedPostsSchema,
      },
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
      set.status = 200;
      return post;
    },
    {
      response: {
        200: postSchema,
        404: errorSchema,
      },
      detail: { summary: "Get post by slug" },
    },
  )
  // --- Protected (authenticated users) ---
  .use(isAuthenticated)
  .post(
    "/",
    async ({ body, user, set }) => {
      try {
        const post = await postsService.create({ ...body, authorId: user.id });
        set.status = 201;
        return post;
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not create post",
        };
      }
    },
    {
      body: createPostBody,
      response: {
        201: postSchema,
        400: errorSchema,
      },
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
      set.status = 200;
      return updated;
    },
    {
      body: updatePostBody,
      response: {
        200: postSchema,
        404: errorSchema,
      },
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
      return { slug };
    },
    {
      response: {
        200: t.Object({ slug: t.String() }),
        404: errorSchema,
      },
      detail: { summary: "Delete a post" },
    },
  )
  .put(
    "/slug/:slug/tags/:tagSlug",
    async ({ params: { slug: postSlug, tagSlug }, set }) => {
      try {
        const updated = await postsService.addTag(postSlug, tagSlug);

        if (!updated) {
          set.status = 404;
          return { message: "Post not found" };
        }

        set.status = 200;
        return { postSlug, tagSlug };
      } catch (e: unknown) {
        set.status = 400;
        return {
          message: e instanceof Error ? e.message : "Could not add tag to post",
        };
      }
    },
    {
      response: {
        200: postTagResponseSchema,
        400: errorSchema,
        404: errorSchema,
      },
      detail: { summary: "Add a tag to a post" },
    },
  )
  .delete(
    "/slug/:slug/tags/:tagSlug",
    async ({ params: { slug: postSlug, tagSlug }, set }) => {
      try {
        const deleted = await postsService.removeTag(postSlug, tagSlug);

        if (!deleted) {
          set.status = 404;
          return { message: "Post not found" };
        }

        set.status = 200;
        return { postSlug, tagSlug };
      } catch (e: unknown) {
        set.status = 404;
        return {
          message:
            e instanceof Error ? e.message : "Could not remove tag from post",
        };
      }
    },
    {
      response: {
        200: postTagResponseSchema,
        400: errorSchema,
        404: errorSchema,
      },
      detail: { summary: "Remove a tag from a post" },
    },
  );
