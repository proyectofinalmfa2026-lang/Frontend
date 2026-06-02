"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/login.schemas";
import { authServices } from "@/services/auth.services";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setIsLoading(true);

      const res = await authServices.login(data);

      setAuth(res.data.user, res.data.token);

      toast.success("¡Bienvenido de vuelta!");

      router.push("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Email o contraseña incorrectos",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02010F] flex items-center justify-center px-4">
      {" "}
      <div className="w-full max-w-md">
        {/* Logo */}{" "}
        <div className="text-center mb-8">
          {" "}
          <h1 className="text-3xl font-bold font-serif text-[#D6D0DC]">
            Cine<span className="text-[#C13A82]">Sphere</span>{" "}
          </h1>
          <p className="text-[#7B7497] mt-2 text-sm animate-bounce">
            Iniciá sesión y continuá trackeando
          </p>
        </div>
        {/* Card */}
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl px-8 py-10 shadow-[0_0_40px_rgba(140,99,201,0.15)]">
          <h2 className="text-xl text-center font-semibold mb-6 text-[#D6D0DC]">
            Iniciar sesión
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
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
              <div className="flex justify-between items-center">
                <label className="text-sm text-[#7B7497]">Contraseña</label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-[#8C63C9] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <input
                {...register("password")}
                type="password"
                placeholder="Tu contraseña"
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
              {isLoading ? "Iniciando sesión..." : "Mostrar mi entrada"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-[#7B7497] mt-6">
            ¿No tenés cuenta?{" "}
            <Link
              href="/Register"
              className="text-[#8C63C9] hover:underline font-medium"
            >
              Registrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
