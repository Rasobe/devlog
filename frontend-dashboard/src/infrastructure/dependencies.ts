import {
    CreatePostUseCase,
    DeletePostUseCase,
    GetCurrentUserUseCase,
    GetPostBySlugUseCase,
    GetPostsUseCase,
    GetUserStatsUseCase,
    LoginUseCase,
    UpdatePostUseCase,
} from "@/application/use-cases";
import {
    AuthRepositoryImpl,
    PostRepositoryImpl,
    UserRepositoryImpl,
} from "./repositories";

export const authRepository = new AuthRepositoryImpl();
export const loginUseCase = new LoginUseCase(authRepository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

export const userRepository = new UserRepositoryImpl();
export const getUserStatsUseCase = new GetUserStatsUseCase(userRepository);

export const postRepository = new PostRepositoryImpl();
export const getPostsUseCase = new GetPostsUseCase(postRepository);
export const createPostUseCase = new CreatePostUseCase(postRepository);
export const getPostBySlugUseCase = new GetPostBySlugUseCase(postRepository);
export const updatePostUseCase = new UpdatePostUseCase(postRepository);
export const deletePostUseCase = new DeletePostUseCase(postRepository);
