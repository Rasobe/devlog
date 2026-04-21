import { Category } from "@/domain/models/category.model";
import type { CategoryResponse } from "../types";

export const CategoryMapper = {
  toDomain(response: CategoryResponse): Category {
    return {
      name: response.name,
      slug: response.slug,
    };
  },
};
