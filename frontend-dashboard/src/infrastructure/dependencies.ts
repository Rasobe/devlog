import {
  CreatePostUseCase,
  DeletePostUseCase,
  GetCurrentUserUseCase,
  GetPostBySlugUseCase,
  GetPaginatedPostsUseCase,
  GetUserStatsUseCase,
  LoginUseCase,
  UpdatePostUseCase,
} from "@/application/use-cases";
import {
  AuthRepositoryImpl,
  CategoryRepositoryImpl,
  PostRepositoryImpl,
  UserRepositoryImpl,
} from "./repositories";
import { GetAllCategoriesUseCase } from "@/application/use-cases/app/category/get-all-categories.useCase";
import { GetCategoryBySlugUseCase } from "@/application/use-cases/app/category/get-category-by-slug.useCase";
import { CreateCategoryUseCase } from "@/application/use-cases/app/category/create-category.useCase";
import { UpdateCategoryUseCase } from "@/application/use-cases/app/category/update-category.useCase";
import { DeleteCategoryUseCase } from "@/application/use-cases/app/category/delete-category.useCase";

export const authRepository = new AuthRepositoryImpl();
export const loginUseCase = new LoginUseCase(authRepository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

export const userRepository = new UserRepositoryImpl();
export const getUserStatsUseCase = new GetUserStatsUseCase(userRepository);

export const postRepository = new PostRepositoryImpl();
export const getPostsUseCase = new GetPaginatedPostsUseCase(postRepository);
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
