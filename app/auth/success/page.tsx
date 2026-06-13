"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import { authServices } from "@/services/auth.services";
import { useAuthStore } from "@/store/authStore";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/Login");
      return;
    }

    const authenticateUser = async () => {
      try {
        Cookies.set("ct_token", token, {
          expires: 7,
        });
        const response = await authServices.me();

        setAuth(response.data, token);

        router.replace("/");
      } catch (error) {
        Cookies.remove("ct_token");
        router.replace("/Login");
      }
    };

    authenticateUser();
  }, [router, searchParams, setAuth]);

  return (
    <div className="min-h-screen bg-[#02010F] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-[#D6D0DC] text-xl font-semibold">
          Iniciando sesión...
        </h2>

        <p className="text-[#7B7497] mt-2">
          Estamos conectando tu cuenta de Google.
        </p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#02010F] flex items-center justify-center">
          <p className="text-[#7B7497]">Cargando...</p>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
