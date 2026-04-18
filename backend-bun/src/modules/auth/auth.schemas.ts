import { t } from "elysia";

// --- Inputs ---
export const registerBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6 }),
  displayName: t.String({ minLength: 2 }),
});

export const loginBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6 }),
});

// --- Outputs ---
export const authUserSchema = t.Object({
  email: t.String(),
  displayName: t.String(),
  role: t.Union([t.Literal("AUTHOR"), t.Literal("ADMIN")]),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const authResponseSchema = t.Object({
  user: authUserSchema,
  token: t.String(),
});
