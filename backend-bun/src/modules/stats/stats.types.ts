export interface UserStats {
  totalPosts: number;
  totalPublishedPosts: number;
  totalDraftPosts: number;
  totalViews: number;
  totalComments: number;
  totalLikes: number;
}

export interface MonthlyPostCount {
  month: string;
  count: number;
}

export function toMonthlyPostCount(row: Record<string, unknown>): MonthlyPostCount {
  return {
    month: String(row.month),
    count: Number(row.count),
  };
}
