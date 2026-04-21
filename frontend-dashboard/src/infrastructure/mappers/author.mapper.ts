import { Author } from "@/domain/models/author.model";
import type { AuthorResponse } from "../types";

export const AuthorMapper = {
  toDomain(response: AuthorResponse): Author {
    return {
      displayName: response.displayName,
      email: response.email,
    };
  },
};
