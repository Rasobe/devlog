import { AuthResult } from "@/domain/models/auth.model";
import { GetMeResponse, LoginResponse } from "../api";

export const AuthMapper = {
  /** API → Domain (lo que lees del backend → lo que usas en tu app) */
  toDomain(response: LoginResponse): AuthResult {
    return {
      token: response.token,
      email: response.user.email,
      displayName: response.user.displayName,
      role: response.user.role,
    };
  },

  toDomainMe(response: GetMeResponse): AuthResult {
    return {
      token: "",
      email: response.email,
      displayName: response.displayName,
      role: response.role,
    };
  },
};
