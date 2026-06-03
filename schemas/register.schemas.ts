import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    username: z
      .string()
      .min(3, "Mínimo 3 caracteres")
      .max(20, "Máximo 20 caracteres")
      .regex(/^[a-z0-9_]+$/, "Solo letras minúsculas, números y _"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .regex(/[A-Z]/, "Debe contener una mayúscula")
      .regex(/[0-9]/, "Debe contener un número"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
