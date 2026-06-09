"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/"); // Redirige al usuario a la página principal después de la autenticación
  }, [router]);

  return (
    <div className="min-h-screen bg-[#02010F] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-[#D6D0DC] text-xl font-semibold">
          Iniciando sesión...
        </h2>

        <p className="text-[#7B7497] mt-2">Redirigiéndote a CineSphere</p>
      </div>
    </div>
  );
}
