import { AuthRepositoryImpl } from "./repositories/auth.repository.impl";
import { LoginUseCase } from "@/application/use-cases/auth/login.useCase";
import { PostRepositoryImpl } from "./repositories/post.repository.impl";
import { GetPostsUseCase } from "@/application/use-cases/app/get-posts.useCase";
import { CreatePostUseCase } from "@/application/use-cases/app/create-post.useCase";

export const authRepository = new AuthRepositoryImpl();
export const loginUseCase = new LoginUseCase(authRepository);

export const postRepository = new PostRepositoryImpl();
export const getPostsUseCase = new GetPostsUseCase(postRepository);
export const createPostUseCase = new CreatePostUseCase(postRepository);
