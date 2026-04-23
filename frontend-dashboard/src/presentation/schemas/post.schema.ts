import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(60, "El título no puede superar los 60 caracteres"),
  excerpt: z
    .string()
    .min(1, "El extracto es obligatorio")
    .max(200, "El extracto no puede superar los 200 caracteres"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  content: z.string().min(1, "El contenido es obligatorio"),
  published: z.boolean(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const defaultCreatePostValues: CreatePostSchema = {
  title: "",
  excerpt: "",
  category: "",
  tags: [],
  content: "",
  published: false,
};

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(60, "El título no puede superar los 60 caracteres"),
  excerpt: z
    .string()
    .min(1, "El extracto es obligatorio")
    .max(200, "El extracto no puede superar los 200 caracteres"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  content: z.string().min(1, "El contenido es obligatorio"),
  published: z.boolean(),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;

export const defaultUpdatePostValues: UpdatePostSchema = {
  title: "",
  excerpt: "",
  category: "",
  tags: [],
  content: "",
  published: false,
};
