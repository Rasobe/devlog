import { t } from "elysia";

export const registerBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6 }),
  displayName: t.String({ minLength: 2 }),
});

export const loginBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6 }),
});
