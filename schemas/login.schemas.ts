import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email Invalido" })
    .max(100, "Email demasiado largo"),

  password: z
    .string()
    .min(8, { message: "Mínimo 8 caracteres" })
    .max(15, "Máximo 15 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
