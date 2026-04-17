import { t } from "elysia";

export const updateMeSchema = t.Object({
  displayName: t.Optional(t.String({ minLength: 2 })),
  username: t.Optional(t.String({ minLength: 3, maxLength: 30 })),
});

export const updateMePassword = t.Object({
  currentPassword: t.String(),
  newPassword: t.String(),
});
