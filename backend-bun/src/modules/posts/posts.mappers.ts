import type { PostWithRelations } from "./posts.types";

export const postWithRelations = {
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

export type DrizzlePostResult = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean | null;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  author: { displayName: string; email: string } | null;
  category: { name: string; slug: string } | null;
  postTags: { tag: { id: string; name: string; slug: string } | null }[];
};

export const mapToDomainPost = (
  dbPost: DrizzlePostResult,
): PostWithRelations => {
  if (!dbPost.author) throw new Error("Post has no author");

  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    content: dbPost.content,
    excerpt: dbPost.excerpt,
    published: dbPost.published,
    views: dbPost.views,
    createdAt: dbPost.createdAt,
    updatedAt: dbPost.updatedAt,
    author: {
      displayName: dbPost.author.displayName,
      email: dbPost.author.email,
    },
    category: dbPost.category
      ? {
          name: dbPost.category.name,
          slug: dbPost.category.slug,
        }
      : null,
    postTags: dbPost.postTags.flatMap((pt) =>
      pt.tag === null
        ? []
        : [
            {
              tag: {
                id: pt.tag.id,
                name: pt.tag.name,
                slug: pt.tag.slug,
              },
            },
          ],
    ),
  };
};
