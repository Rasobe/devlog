import { AuthResult } from "@/domain/models/auth.model";
import type { AuthResponse } from "../api/types.gen";

export const AuthMapper = {
  /** API → Domain (lo que lees del backend → lo que usas en tu app) */
  toDomain(response: AuthResponse): AuthResult {
    return {
      token: response.token,
      email: response.email,
      displayName: response.displayName,
    };
  },
};
