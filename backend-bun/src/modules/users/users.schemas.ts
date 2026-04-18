import { t } from "elysia";

// --- Inputs ---
export const updateMeSchema = t.Object({
  displayName: t.Optional(t.String({ minLength: 2 })),
  username: t.Optional(t.String({ minLength: 3, maxLength: 30 })),
});

export const updateMePassword = t.Object({
  currentPassword: t.String(),
  newPassword: t.String(),
});

// --- Outputs ---
export const userPublicSchema = t.Object({
  username: t.String(),
  displayName: t.String(),
  createdAt: t.Date(),
});

export const userPrivateSchema = t.Object({
  ...userPublicSchema.properties,
  email: t.String(),
  role: t.Union([t.Literal("ADMIN"), t.Literal("AUTHOR")]),
});
