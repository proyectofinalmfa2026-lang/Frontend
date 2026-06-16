import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Mínimo 2 caracteres")
      .max(30, "Máximo 30 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\-']+$/,
        "Solo letras, espacios, guiones y apóstrofes",
      ),
    username: z
      .string()
      .min(3, "Mínimo 3 caracteres")
      .max(20, "Máximo 20 caracteres")
      .regex(/^[a-z0-9_]+$/, "Solo letras, números y _")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula"),
    email: z
      .string()
      .email("Email inválido")
      .max(100, "Email demasiado largo")
      .refine((email) => {
        const domain = email.split("@")[1];
        // Bloquea dominios sin punto o con extensión de un solo caracter
        return (
          domain && domain.includes(".") && domain.split(".").pop()!.length >= 2
        );
      }, "Ingresá un email válido"),
    password: z
      .string()
      .min(6, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[0-9]/, "Debe contener al menos número"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
