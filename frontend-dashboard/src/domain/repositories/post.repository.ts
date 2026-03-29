import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsResponse,
} from "@/infrastructure/api";

export interface IPostRepository {
  getPosts(publishedOnly?: boolean): Promise<GetPostsResponse>;
  createPost(request: CreatePostRequest): Promise<CreatePostResponse>;
}
