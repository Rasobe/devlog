import type { User, UserPrivate, UserPublic } from "./users.types";

export const toUserPrivate = (user: User): UserPrivate => {
  const { passwordHash, ...rest } = user;
  return rest;
};

export const toUserPublic = (user: User): UserPublic => {
  const { passwordHash, email, role, id, ...rest } = user;
  return rest;
};
