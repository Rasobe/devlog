import { PostStatus } from "@/domain/models/post.model";

export const queryKeys = {
  posts: {
    all: () => ["posts"] as const,
    allPaginated: (page: number, search: string, status: PostStatus) =>
      ["posts", page, search, status] as const,
    detail: (slug: string) => ["post", slug] as const,
  },
  user: {
    stats: () => ["user-stats"] as const,
  },
};
