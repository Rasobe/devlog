import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

// Types inferred from schema
export type PostInsert = typeof posts.$inferInsert;
export type PostUpdate = Partial<
  Omit<PostInsert, "id" | "createdAt" | "authorId">
>;

// Shared relation config, avoid repeating across queries
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
  findAll: async () => {
    return db.query.posts.findMany({
      with: postWithRelations,
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
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

  create: async (data: PostInsert) => {
    const [created] = await db.insert(posts).values(data).returning();
    return created!;
  },

  update: async (id: string, data: PostUpdate) => {
    const [updated] = await db
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
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
};
