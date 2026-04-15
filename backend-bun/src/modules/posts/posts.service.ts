import { db } from "@/db";
import { categories, posts, postTags, tags } from "@/db/schema";
import { generateSlug } from "@/lib/slug";
import { and, count, eq, desc, inArray, ilike, exists } from "drizzle-orm";
import type {
  PostPaginationParams,
  CreatePostInput,
  PostUpdate,
} from "./posts.types";
import type { PaginatedResult } from "@/types/pagination";

const postWithRelations = {
  author: {
    columns: { displayName: true, email: true },
  },
  category: {
    columns: { name: true, slug: true },
  },
  postTags: {
    with: { tag: true },
  },
} as const;

export const postsService = {
  findAll: async ({
    page,
    limit,
    search,
    category,
    tag,
    published,
  }: PostPaginationParams): Promise<PaginatedResult<any>> => {
    const offset = (page - 1) * limit;

    const tagFilter = tag
      ? exists(
          db
            .select()
            .from(postTags)
            .innerJoin(tags, eq(postTags.tagId, tags.id))
            .where(and(eq(postTags.postId, posts.id), eq(tags.slug, tag))),
        )
      : undefined;

    const where = and(
      published === undefined ? undefined : eq(posts.published, published),
      search ? ilike(posts.title, `%${search}%`) : undefined,
      category
        ? eq(
            posts.categoryId,
            db
              .select({ id: categories.id })
              .from(categories)
              .where(eq(categories.slug, category))
              .limit(1),
          )
        : undefined,
      tagFilter,
    );

    const [paginatedPosts, countResult] = await Promise.all([
      db
        .select({ id: posts.id })
        .from(posts)
        .where(where)
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(posts).where(where),
    ]);

    const ids = paginatedPosts.map((p) => p.id);

    const result =
      ids.length > 0
        ? await db.query.posts.findMany({
            where: inArray(posts.id, ids),
            columns: {
              categoryId: false,
              authorId: false,
            },
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
      columns: {
        categoryId: false,
        authorId: false,
      },
    });
  },

  findBySlug: async (slug: string) => {
    return db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      with: postWithRelations,
      columns: {
        categoryId: false,
        authorId: false,
      },
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

  update: async (slug: string, data: PostUpdate) => {
    const updateData = data.title
      ? { ...data, slug: generateSlug(data.title), updatedAt: new Date() }
      : { ...data, updatedAt: new Date() };

    const [updated] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.slug, slug))
      .returning();
    return updated;
  },

  delete: async (slug: string) => {
    const [deleted] = await db
      .delete(posts)
      .where(eq(posts.slug, slug))
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
