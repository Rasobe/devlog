import z from "zod";

// * ******************************************************
// * Create Post Schema
// * ******************************************************
export const createPostSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  content: z.string().min(1, "El contenido es obligatorio"),
  excerpt: z
    .string()
    .min(1, "El extracto es obligatorio")
    .max(200, "El extracto no puede superar los 200 caracteres"),
  published: z.boolean(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const defaultCreatePostValues: CreatePostSchema = {
  title: "",
  content: "",
  excerpt: "",
  published: false,
};


// * ******************************************************
// * Update Post Schema
// * ******************************************************
export const updatePostSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  content: z.string().min(1, "El contenido es obligatorio"),
  excerpt: z
    .string()
    .min(1, "El extracto es obligatorio")
    .max(200, "El extracto no puede superar los 200 caracteres"),
  published: z.boolean(),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;

export const defaultUpdatePostValues: UpdatePostSchema = {
  title: "",
  content: "",
  excerpt: "",
  published: false,
};

