export interface UserStats {
  totalPosts: number;
  totalPublishedPosts: number;
  totalDraftPosts: number;
  totalViews: number;
  totalComments: number;
  totalLikes: number;
  postsByMonth: MonthlyPostCount[];
}

export interface MonthlyPostCount {
  month: string;
  count: number;
}
