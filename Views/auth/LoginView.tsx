"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/login.schemas";
import { authServices } from "@/services/auth.services";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
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

  const handleGoogleLogin = () => {
    toast.info("Google Login proximamente disponible");
    // Aquí podrías redirigir a tu backend para iniciar el flujo de autenticación de Google
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

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
    <div className="min-h-screen bg-[#02010F] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
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
            Continuá tu experiencia cinéfila
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
          <div className="flex items-center gap-3 my-2">
            <div className="h-px flex-1 bg-[#22194A]" />
            <span className="text-xs text-[#7B7497]">o continuá con</span>
            <div className="h-px flex-1 bg-[#22194A]" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="
    flex
    items-center
    justify-center
    gap-3
    w-full
    bg-white
    hover:bg-gray-100
    text-gray-800
    font-medium
    py-3
    rounded-lg
    transition-colors
    cursor-pointer
  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20"
              height="20"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.199 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.146 35.091 26.671 36 24 36c-5.178 0-9.623-3.327-11.283-7.946l-6.522 5.025C9.539 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.084 5.57l.003-.002 6.19 5.238C36.971 38.493 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Continuar con Google
          </button>

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
