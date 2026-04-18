import { t } from "elysia";

export const monthlyPostCountSchema = t.Object({
  month: t.String(),
  count: t.Number(),
});

export const userStatsResponseSchema = t.Object({
  totalPosts: t.Number(),
  totalPublishedPosts: t.Number(),
  totalDraftPosts: t.Number(),
  totalViews: t.Number(),
  totalComments: t.Number(),
  totalLikes: t.Number(),
  postsByMonth: t.Array(monthlyPostCountSchema),
});
