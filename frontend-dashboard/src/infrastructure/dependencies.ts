import { AuthRepositoryImpl } from "./repositories/auth.repository.impl";
import { LoginUseCase } from "@/application/use-cases/auth/login.useCase";
import { PostRepositoryImpl } from "./repositories/post.repository.impl";
import { GetPostsUseCase } from "@/application/use-cases/app/get-posts.useCase";
import { CreatePostUseCase } from "@/application/use-cases/app/create-post.useCase";
import { GetPostBySlugUseCase } from "@/application/use-cases/app/get-post-by-slug.useCase";
import { GetPostByIdUseCase } from "@/application/use-cases/app/get-post-by-id.useCase";
import { UpdatePostUseCase } from "@/application/use-cases/app/update-post.useCase";

export const authRepository = new AuthRepositoryImpl();
export const loginUseCase = new LoginUseCase(authRepository);

export const postRepository = new PostRepositoryImpl();
export const getPostsUseCase = new GetPostsUseCase(postRepository);
export const createPostUseCase = new CreatePostUseCase(postRepository);
export const getPostBySlugUseCase = new GetPostBySlugUseCase(postRepository);
export const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);
export const updatePostUseCase = new UpdatePostUseCase(postRepository);
