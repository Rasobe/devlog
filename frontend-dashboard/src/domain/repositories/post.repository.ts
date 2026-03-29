import { GetPostsResponse } from "@/infrastructure/api";

export interface IPostRepository {
  getPosts(publishedOnly?: boolean): Promise<GetPostsResponse>;
}
