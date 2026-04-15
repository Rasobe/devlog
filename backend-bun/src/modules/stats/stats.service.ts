import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import type { UserStats } from "./stats.types";

export const statsService = {
  getUserStats: async (userId: string): Promise<UserStats> => {
    const [stats] = await db
      .select({
        totalPosts: sql<number>`count(*)::int`,
        totalPublishedPosts: sql<number>`count(*) filter (where ${posts.published} = true)::int`,
        totalDraftPosts: sql<number>`count(*) filter (where ${posts.published} = false)::int`,
        totalViews: sql<number>`coalesce(sum(${posts.views}), 0)::int`,
      })
      .from(posts)
      .where(eq(posts.authorId, userId));

    return {
      totalPosts: stats?.totalPosts ?? 0,
      totalPublishedPosts: stats?.totalPublishedPosts ?? 0,
      totalDraftPosts: stats?.totalDraftPosts ?? 0,
      totalViews: stats?.totalViews ?? 0,
      totalComments: 0,
      totalLikes: 0,
    };
  },
};
