export interface UserStats {
  totalPosts: number;
  totalPublishedPosts: number;
  totalDraftPosts: number;
  totalViews: number;
}

export interface UserMonthlyActivity {
  month: string;
  totalPosts: number;
}
