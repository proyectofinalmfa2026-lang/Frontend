"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/register.schemas";
import UsernameRules from "@/components/auth/usernameRules";
import PasswordRules from "@/components/auth/passwordRules";
import { authServices } from "@/services/auth.services";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { showRegisterToast, showRegisterErrorToast } from "@/lib/toasts/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { user, setAuth } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);
  const password = watch("password", "");
  const username = watch("username", "");
  const onSubmit = async (data: RegisterSchema) => {
    try {
      setIsLoading(true);
      const res = await authServices.register(data);
      setAuth(res.data.user, res.data.token);
      showRegisterToast();
      router.push("/");
    } catch (error: any) {
      showRegisterErrorToast(error.response?.data?.message);
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
                maxLength={30}
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
                maxLength={15}
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
              <UsernameRules username={username} />
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

              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  maxLength={15}
                  placeholder="Mínimo 8 caracteres"
                  className="
                  bg-[#02010F]
                  border border-[#22194A]
                  rounded-lg
                  px-4 py-3
                  pr-10
                  w-full
                  text-sm
                  text-[#D6D0DC]
                  placeholder:text-[#7B7497]
                  focus:outline-none
                  focus:border-[#8C63C9]
                  transition-colors
                "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B7497] hover:text-[#D6D0DC] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              <PasswordRules password={password} />

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

              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  maxLength={15}
                  placeholder="Repite tu contraseña"
                  className="
                  bg-[#02010F]
                  border border-[#22194A]
                  rounded-lg
                  px-4 py-3
                  pr-10
                  w-full
                  text-sm
                  text-[#D6D0DC]
                  placeholder:text-[#7B7497]
                  focus:outline-none
                  focus:border-[#8C63C9]
                  transition-colors
                "
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B7497] hover:text-[#D6D0DC] transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>

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
          <p className="text-center text-sm text-[#7B7497] mt-6 ">
            ¿Ya tienes una cuenta?
            <Link
              href="/Login"
              className="text-[#8C63C9] hover:underline font-medium cursor-pointer p-2"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
