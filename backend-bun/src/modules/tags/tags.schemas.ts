import { t } from "elysia";

export const createTagBody = t.Object({
  name: t.String(),
});

export const updateTagBody = t.Object({
  name: t.Optional(t.String()),
});
