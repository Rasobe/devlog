import { db } from "@/db";
import { posts } from "@/db/schema";
import { generateSlug } from "@/lib/slug";
import { eq } from "drizzle-orm";

export type PostUpdate = Partial<
  Omit<typeof posts.$inferInsert, "id" | "createdAt" | "authorId">
>;

export type CreatePostInput = {
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  published?: boolean;
  categoryId?: string | null;
};

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
};
