import type { User, UserPrivate, UserPublic } from "./users.types";

/**
 * Maps a database user object to a Private User profile.
 * Handles Date to String conversion for API consistency.
 */
export const toUserPrivate = (user: User): UserPrivate => {
  return {
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

/**
 * Maps a database user object to a Public User profile.
 * Strips sensitive information and converts dates.
 */
export const toUserPublic = (user: User): UserPublic => {
  return {
    username: user.username,
    displayName: user.displayName,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};
