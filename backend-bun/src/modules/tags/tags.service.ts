import { db } from "@/db";
import { tags } from "@/db/schema";
import { generateSlug } from "@/lib/slug";
import { eq } from "drizzle-orm";
import type { CreateTagInput, UpdateTagInput } from "./tags.types";

export const tagsService = {
  findAll: async () => {
    return db.query.tags.findMany();
  },

  findBySlug: async (slug: string) => {
    return db.query.tags.findFirst({
      where: eq(tags.slug, slug),
    });
  },

  create: async (data: CreateTagInput) => {
    const slug = generateSlug(data.name);

    const existing = await db.query.tags.findFirst({
      where: eq(tags.slug, slug),
    });

    if (existing) {
      throw new Error("Tag already exists");
    }

    const [tag] = await db
      .insert(tags)
      .values({ name: data.name, slug })
      .returning();

    if (!tag) throw new Error("Failed to create tag");

    return tag;
  },

  update: async (slug: string, data: UpdateTagInput) => {
    const existing = await db.query.tags.findFirst({
      where: eq(tags.slug, slug),
    });

    if (!existing) {
      throw new Error("Tag not found");
    }

    const updateData = data.name
      ? { name: data.name, slug: generateSlug(data.name) }
      : {};

    if (updateData.slug && updateData.slug !== slug) {
      const slugConflict = await db.query.tags.findFirst({
        where: eq(tags.slug, updateData.slug),
      });
      if (slugConflict) {
        throw new Error("Tag with that name already exists");
      }
    }

    const [updated] = await db
      .update(tags)
      .set(updateData)
      .where(eq(tags.slug, slug))
      .returning();

    return updated;
  },

  delete: async (slug: string) => {
    const existing = await db.query.tags.findFirst({
      where: eq(tags.slug, slug),
    });

    if (!existing) {
      throw new Error("Tag not found");
    }

    const [deleted] = await db
      .delete(tags)
      .where(eq(tags.slug, slug))
      .returning();

    return deleted;
  },
};
