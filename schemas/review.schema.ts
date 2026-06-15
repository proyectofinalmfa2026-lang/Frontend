import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "El rating mínimo es 1")
    .max(5, "El rating máximo es 5"),
  comment: z
    .string()
    .min(10, "El comentario debe tener al menos 10 caracteres")
    .max(500, "El comentario no puede superar los 500 caracteres"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
