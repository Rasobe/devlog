import {
  LoginUseCase,
  GetCurrentUserUseCase,
  GetUserStatsUseCase,
  GetPostsUseCase,
  CreatePostUseCase,
  GetPostBySlugUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
  GetAllCategoriesUseCase,
  GetCategoryBySlugUseCase,
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
  CreateTagUseCase,
  DeleteTagUseCase,
  GetAllTagsUseCase,
  GetTagBySlugUseCase,
  UpdateTagUseCase,
} from "@/application/use-cases";
import {
  AuthRepositoryImpl,
  UserRepositoryImpl,
  PostRepositoryImpl,
  CategoryRepositoryImpl,
  TagRepositoryImpl,
} from "./repositories";
import { client } from "./api/client.gen";
import { authStorage } from "./services/auth-storage";

// Global HTTP Interceptor for Authentication
client.instance.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const categoryRepository = new CategoryRepositoryImpl();
export const getAllCategoriesUseCase = new GetAllCategoriesUseCase(
  categoryRepository,
);
export const getCategoryBySlugUseCase = new GetCategoryBySlugUseCase(
  categoryRepository,
);
export const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
);
export const updateCategoryUseCase = new UpdateCategoryUseCase(
  categoryRepository,
);
export const deleteCategoryUseCase = new DeleteCategoryUseCase(
  categoryRepository,
);

export const tagRepository = new TagRepositoryImpl();
export const getAllTagsUseCase = new GetAllTagsUseCase(tagRepository);
export const getTagBySlugUseCase = new GetTagBySlugUseCase(tagRepository);
export const createTagUseCase = new CreateTagUseCase(tagRepository);
export const updateTagUseCase = new UpdateTagUseCase(tagRepository);
export const deleteTagUseCase = new DeleteTagUseCase(tagRepository);
