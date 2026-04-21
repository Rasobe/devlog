import { Tag } from "@/domain/models/tag.model";
import type { TagResponse } from "../types";

export const TagMapper = {
  toDomain(response: TagResponse): Tag {
    return {
      name: response.name,
      slug: response.slug,
    };
  },
};
