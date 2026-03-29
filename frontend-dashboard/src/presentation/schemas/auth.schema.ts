import z from "zod";

export const loginSchema = z.object({
  email: z.email("Introduce un email válido"),
  password: z.string().min(1, "Introduce tu contraseña"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const defaultLoginValues: LoginSchema = {
  email: "",
  password: "",
};
