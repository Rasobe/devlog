import { db } from "@/db";
import { posts, postTags, tags } from "@/db/schema";
import { generateSlug } from "@/lib/slug";
import { and, count, eq, desc, inArray } from "drizzle-orm";
import type {
  PostPaginationParams,
  PostPaginatedResult,
  CreatePostInput,
  PostUpdate,
} from "./posts.types";

const postWithRelations = {
  author: {
    columns: { id: true, displayName: true, email: true },
  },
  category: true,
  postTags: {
    with: { tag: true },
  },
} as const;

export const postsService = {
  findAll: async ({
    page,
    limit,
  }: PostPaginationParams): Promise<PostPaginatedResult> => {
    const offset = (page - 1) * limit;

    const [paginatedPosts, countResult] = await Promise.all([
      db
        .select({ id: posts.id })
        .from(posts)
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(posts),
    ]);

    const ids = paginatedPosts.map((p) => p.id);

    const result =
      ids.length > 0
        ? await db.query.posts.findMany({
            where: inArray(posts.id, ids),
            with: postWithRelations,
            orderBy: (posts, { desc }) => [desc(posts.createdAt)],
          })
        : [];

    const total = countResult[0]?.total ?? 0;

    return {
      data: result,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  findById: async (id: string) => {
    return db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: postWithRelations,
    });
  },

  findBySlug: async (slug: string) => {
    return db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      with: postWithRelations,
    });
  },

  create: async (data: CreatePostInput) => {
    const slug = generateSlug(data.title);
    const [created] = await db
      .insert(posts)
      .values({ ...data, slug })
      .returning();
    return created!;
  },

  update: async (id: string, data: PostUpdate) => {
    const updateData = data.title
      ? { ...data, slug: generateSlug(data.title), updatedAt: new Date() }
      : { ...data, updatedAt: new Date() };

    const [updated] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning();
    return updated;
  },

  delete: async (id: string) => {
    const [deleted] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return deleted;
  },

  addTag: async (postSlug: string, tagSlug: string) => {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, postSlug),
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const tag = await db.query.tags.findFirst({
      where: eq(tags.slug, tagSlug),
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const already = await db.query.postTags.findFirst({
      where: and(eq(postTags.postId, post.id), eq(postTags.tagId, tag.id)),
    });

    if (already) {
      throw new Error("Tag already assigned to this post");
    }

    const [created] = await db
      .insert(postTags)
      .values({ postId: post.id, tagId: tag.id })
      .returning();

    return created;
  },

  removeTag: async (postSlug: string, tagSlug: string) => {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, postSlug),
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const tag = await db.query.tags.findFirst({
      where: eq(tags.slug, tagSlug),
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const [deleted] = await db
      .delete(postTags)
      .where(and(eq(postTags.postId, post.id), eq(postTags.tagId, tag.id)))
      .returning();

    return deleted;
  },
};
