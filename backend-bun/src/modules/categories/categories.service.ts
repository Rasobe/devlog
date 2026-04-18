import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./categories.types";
import { generateSlug } from "@/lib/strings";

export const categoriesService = {
  findAll: async () => {
    return db.query.categories.findMany({
      columns: { id: false },
    });
  },

  findBySlug: async (slug: string) => {
    return db.query.categories.findFirst({
      where: eq(categories.slug, slug),
      columns: { id: false },
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
      .values({ name: data.name, slug })
      .returning({
        name: categories.name,
        slug: categories.slug,
      });

    if (!category) throw new Error("Failed to create category");

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
      : {};

    if (updateData.slug && updateData.slug !== slug) {
      const slugConflict = await db.query.categories.findFirst({
        where: eq(categories.slug, updateData.slug),
      });
      if (slugConflict) {
        throw new Error("Category with that name already exists");
      }
    }

    const [updated] = await db
      .update(categories)
      .set(updateData)
      .where(eq(categories.slug, slug))
      .returning({
        name: categories.name,
        slug: categories.slug,
      });

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
      .returning({
        name: categories.name,
        slug: categories.slug,
      });

    return deleted;
  },
};
