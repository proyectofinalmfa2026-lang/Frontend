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
    console.log("AUTH SUCCESS PAGE LOADED");

    const token = searchParams.get("token");

    console.log("TOKEN FROM URL:", token);

    if (!token) {
      console.log("NO TOKEN FOUND -> REDIRECT LOGIN");

      router.replace("/Login");
      return;
    }

    const authenticateUser = async () => {
      try {
        console.log("SAVING TOKEN IN COOKIE");

        Cookies.set("ct_token", token, {
          expires: 7,
        });

        console.log("CALLING /auth/profile");

        const response = await authServices.me();

        console.log("PROFILE RESPONSE:", response.data);

        console.log("SETTING AUTH STORE");

        setAuth(response.data, token);

        console.log("REDIRECTING HOME");

        router.replace("/");
      } catch (error) {
        console.error("GOOGLE LOGIN ERROR:", error);

        Cookies.remove("ct_token");

        console.log("COOKIE REMOVED");

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
