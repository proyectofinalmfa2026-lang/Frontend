"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/register.schemas";
import { authServices } from "@/services/auth.services";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setIsLoading(true);
      const res = await authServices.register(data);
      setAuth(res.data.user, res.data.token);
      toast.success("¡Cuenta creada exitosamente!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02010F] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-[#D6D0DC]">
            Cine<span className="text-[#C13A82]">Sphere</span>
          </h1>

          <p className="text-[#7B7497] mt-2 text-sm animate-bounce">
            Creá tu cuenta y empezá a trackear
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl px-8 py-10 shadow-[0_0_100px_rgba(140,99,201,0.15)]">
          <h2 className="text-xl text-center font-semibold mb-6 text-[#D6D0DC]">
            Crear cuenta
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#7B7497]">Nombre completo</label>

              <input
                {...register("name")}
                placeholder="Tu nombre"
                className="
                bg-[#02010F]
                border border-[#22194A]
                rounded-lg
                px-4 py-3
                text-sm
                text-[#D6D0DC]
                placeholder:text-[#7B7497]
                focus:outline-none
                focus:border-[#8C63C9]
                transition-colors
              "
              />

              {errors.name && (
                <span className="text-[#C13A82] text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#7B7497]">
                Nombre de usuario
              </label>

              <input
                {...register("username")}
                placeholder="ej: cine_lover"
                className="
                bg-[#02010F]
                border border-[#22194A]
                rounded-lg
                px-4 py-3
                text-sm
                text-[#D6D0DC]
                placeholder:text-[#7B7497]
                focus:outline-none
                focus:border-[#8C63C9]
                transition-colors
              "
              />

              {errors.username && (
                <span className="text-[#C13A82] text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#7B7497]">Email</label>

              <input
                {...register("email")}
                type="email"
                placeholder="tu@email.com"
                className="
                bg-[#02010F]
                border border-[#22194A]
                rounded-lg
                px-4 py-3
                text-sm
                text-[#D6D0DC]
                placeholder:text-[#7B7497]
                focus:outline-none
                focus:border-[#8C63C9]
                transition-colors
              "
              />

              {errors.email && (
                <span className="text-[#C13A82] text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#7B7497]">Contraseña</label>

              <input
                {...register("password")}
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="
                bg-[#02010F]
                border border-[#22194A]
                rounded-lg
                px-4 py-3
                text-sm
                text-[#D6D0DC]
                placeholder:text-[#7B7497]
                focus:outline-none
                focus:border-[#8C63C9]
                transition-colors
              "
              />

              {errors.password && (
                <span className="text-[#C13A82] text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#7B7497]">
                Confirmar contraseña
              </label>

              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Repetí tu contraseña"
                className="
                bg-[#02010F]
                border border-[#22194A]
                rounded-lg
                px-4 py-3
                text-sm
                text-[#D6D0DC]
                placeholder:text-[#7B7497]
                focus:outline-none
                focus:border-[#8C63C9]
                transition-colors
              "
              />

              {errors.confirmPassword && (
                <span className="text-[#C13A82] text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
              bg-[#C13A82]
              hover:bg-[#A92F71]
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              font-medium
              py-3
              rounded-lg
              text-sm
              transition-colors
              mt-1
              cursor-pointer
            "
            >
              {isLoading ? "Creando cuenta..." : "Soy cinéfilo, entrar"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-[#7B7497] mt-6">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/Login"
              className="text-[#8C63C9] hover:underline font-medium cursor-pointer"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
