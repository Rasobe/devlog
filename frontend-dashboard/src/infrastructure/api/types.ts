import type {
  GetPostsResponse,
  LoginResponse,
  GetMeResponse,
  GetMyStatsResponse,
  CreatePostData,
  UpdatePostBySlugData,
} from "./types.gen";

// Posts
export type PostResponse = GetPostsResponse["data"][number];
export type PostsPagedResponse = GetPostsResponse;
export type CreatePostRequest = CreatePostData["body"];
export type UpdatePostRequest = UpdatePostBySlugData["body"];

// Auth
export type AuthResponse = LoginResponse;
export type UserResponse = GetMeResponse;

// Stats
export type UserStatsResponse = GetMyStatsResponse;
