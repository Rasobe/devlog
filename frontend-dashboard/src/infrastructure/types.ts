import type {
  GetPostsResponse,
  LoginResponse,
  GetMeResponse,
  GetMyStatsResponse,
  CreatePostData,
  UpdatePostBySlugData,
  GetCategoriesResponse,
  GetTagsResponse,
} from "./api/types.gen";

// Posts
export type PostResponse = GetPostsResponse["data"][number];
export type PostsPagedResponse = GetPostsResponse;
export type CreatePostRequest = CreatePostData["body"];
export type UpdatePostRequest = UpdatePostBySlugData["body"];
export type AuthorResponse = PostResponse["author"];
export type CategoryResponse = GetCategoriesResponse[number];
export type TagResponse = GetTagsResponse[number];

// Auth
export type AuthResponse = LoginResponse;
export type UserResponse = GetMeResponse;

// Stats
export type UserStatsResponse = GetMyStatsResponse;
