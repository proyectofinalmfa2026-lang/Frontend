import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email Invalido" }),
  password: z.string().min(8, { message: "Mínimo 8 caracteres" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
