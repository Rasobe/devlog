import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import type { MonthlyPostCount, UserStats } from "./stats.types";
import { toMonthlyPostCount } from "./stats.types";
import { buildActivityQuery } from "./stats.queries";

export const statsService = {
  getUserStats: async (userId: string): Promise<UserStats> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: { role: true, createdAt: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isAdmin = user.role === "ADMIN";

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
    };
  },

  getActivityByPeriod: async (
    userId: string,
    period: number,
  ): Promise<MonthlyPostCount[]> => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: { id: true, role: true },
    });

    if (!user) throw new Error("User not found");

    const query = buildActivityQuery(period, userId, user.role === "ADMIN");
    const result = await db.execute(query);

    return [...result].map(toMonthlyPostCount);
  },
};
