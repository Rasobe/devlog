import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq, type Update } from "drizzle-orm";

export type CategoryInsert = typeof categories.$inferInsert;

export type CreateCategoryInput = {
  name: string;
};

export type UpdateCategoryInput = {
  name?: string;
};

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export const categoriesService = {
  findAll: async () => {
    return db.query.categories.findMany();
  },

  findBySlug: async (slug: string) => {
    return db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
  },

  create: async (data: CreateCategoryInput) => {
    const slug = generateSlug(data.name);

    const existing = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });

    if (existing) {
      throw new Error("Category already exists");
    }

    const [category] = await db
      .insert(categories)
      .values({
        name: data.name,
        slug,
      })
      .returning();

    return category;
  },

  update: async (slug: string, data: UpdateCategoryInput) => {
    const existing = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });

    if (!existing) {
      throw new Error("Category not found");
    }

    const updateData = data.name
      ? { name: data.name, slug: generateSlug(data.name) }
      : { name: data.name };

    if (updateData.slug && updateData.slug !== slug) {
      const existingNewSlug = await db.query.categories.findFirst({
        where: eq(categories.slug, updateData.slug),
      });

      if (existingNewSlug) {
        throw new Error("Category already exists");
      }
    }

    const [updated] = await db
      .update(categories)
      .set(updateData)
      .where(eq(categories.slug, slug))
      .returning();

    return updated;
  },

  delete: async (slug: string) => {
    const existing = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });

    if (!existing) {
      throw new Error("Category not found");
    }

    const [deleted] = await db
      .delete(categories)
      .where(eq(categories.slug, slug))
      .returning();

    return deleted;
  },
};
