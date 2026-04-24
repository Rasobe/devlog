export enum UserRole {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
}

export interface AuthResult {
  token: string;
  email: string;
  displayName: string;
  role: string;
}
