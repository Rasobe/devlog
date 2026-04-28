import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import type { UserStats } from "./stats.types";

export const statsService = {
  getUserStats: async (userId: string): Promise<UserStats> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: { role: true, createdAt: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const startDate =
      user?.createdAt && user.createdAt > twelveMonthsAgo
        ? user.createdAt
        : twelveMonthsAgo;

    const isAdmin = user.role === "ADMIN";

    const where = isAdmin
      ? gte(posts.createdAt, startDate)
      : and(eq(posts.authorId, userId), gte(posts.createdAt, startDate));

    const postsByMonth = await db
      .select({
        month: sql<string>`to_char(date_trunc('month', ${posts.createdAt}), 'YYYY-MM')`,
        count: sql<number>`count(*)::int`,
      })
      .from(posts)
      .where(where)
      .groupBy(sql`date_trunc('month', ${posts.createdAt})`)
      .orderBy(sql`date_trunc('month', ${posts.createdAt})`);

    const statsWhere = isAdmin ? undefined : eq(posts.authorId, userId);

    const [stats] = await db
      .select({
        totalPosts: sql<number>`count(*)::int`,
        totalPublishedPosts: sql<number>`count(*) filter (where ${posts.published} = true)::int`,
        totalDraftPosts: sql<number>`count(*) filter (where ${posts.published} = false)::int`,
        totalViews: sql<number>`coalesce(sum(${posts.views}), 0)::int`,
      })
      .from(posts)
      .where(statsWhere);

    return {
      totalPosts: stats?.totalPosts ?? 0,
      totalPublishedPosts: stats?.totalPublishedPosts ?? 0,
      totalDraftPosts: stats?.totalDraftPosts ?? 0,
      totalViews: stats?.totalViews ?? 0,
      totalComments: 0,
      totalLikes: 0,
      postsByMonth,
    };
  },
};
