import { PostStatus } from "@/domain/models/post.model";

export const queryKeys = {
  posts: {
    all: () => ["posts"] as const,
    allPaginated: (page: number, search: string, status: PostStatus) =>
      ["posts", page, search, status] as const,
    detail: (slug: string) => ["posts", "detail", slug] as const,
  },
  categories: {
    all: () => ["categories"] as const,
    delete: (slug: string) => ["categories", "delete", slug] as const,
  },
  tags: {
    all: () => ["tags"] as const,
    delete: (slug: string) => ["tags", "delete", slug] as const,
  },
  user: {
    stats: () => ["user", "stats"] as const,
    activity: (period: number) =>
      ["user", "stats", "activity", period] as const,
  },
};
