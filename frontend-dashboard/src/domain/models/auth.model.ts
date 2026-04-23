export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface AuthResult {
  token: string;
  email: string;
  displayName: string;
}
