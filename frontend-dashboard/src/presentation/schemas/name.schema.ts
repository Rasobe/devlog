import z from "zod";

export const nameSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos dos caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),
});

export type NameSchema = z.infer<typeof nameSchema>;

export const defaultNameValues: NameSchema = {
  name: "",
};
