"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { confirmSubscription } from "@/services/premium.services";

function ResultContent() {
  const searchParams = useSearchParams();
  const { token } = useAuthStore();
  const [confirming, setConfirming] = useState(true);
  const [confirmError, setConfirmError] = useState(false);

  const preapprovalId = searchParams.get("preapproval_id");
  const status = searchParams.get("status");

  useEffect(() => {
    if (!preapprovalId || !token) {
      setConfirming(false);
      return;
    }

    confirmSubscription(token, preapprovalId)
      .then(() => setConfirming(false))
      .catch(() => {
        setConfirmError(true);
        setConfirming(false);
      });
  }, [preapprovalId, token]);

  const isSuccess = !status || status === "authorized" || status === "approved";
  const isPending = status === "pending";

  return (
    <main className="min-h-screen bg-[#02010F] flex items-center justify-center">
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-2xl p-8 max-w-md mx-4 text-center">
        {confirming ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#C13A82]/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg
                className="w-8 h-8 text-[#C13A82]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-[#D6D0DC] mb-2">
              Activando tu suscripción...
            </h1>
            <p className="text-sm text-[#7B7497] mb-6">
              Espera un momento mientras confirmamos tu pago.
            </p>
          </>
        ) : isSuccess && !confirmError ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#63C995]/20 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#63C995]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-[#D6D0DC] mb-2">
              ¡Ya eres Premium!
            </h1>
            <p className="text-sm text-[#7B7497] mb-6">
              Tu suscripción a CineSphere Premium está activa. Disfruta de todos
              los beneficios.
            </p>
          </>
        ) : isPending ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#F0A500]/20 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#F0A500]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-[#D6D0DC] mb-2">
              Pago pendiente
            </h1>
            <p className="text-sm text-[#7B7497] mb-6">
              Estamos esperando la confirmación del pago. Te avisaremos cuando
              esté listo.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-[#C13A82]/20 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#C13A82]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-[#D6D0DC] mb-2">
              Error en el pago
            </h1>
            <p className="text-sm text-[#7B7497] mb-6">
              Algo salió mal con el pago. Puedes intentarlo de nuevo desde la
              página de premium.
            </p>
          </>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/profile"
            className="bg-[#C13A82] hover:bg-[#A92F71] text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Ir a mi perfil
          </Link>
          <Link
            href="/premium"
            className="text-sm text-[#7B7497] hover:text-[#D6D0DC] transition-colors"
          >
            Volver a Premium
          </Link>
        </div>

        {preapprovalId && (
          <p className="text-[10px] text-[#7B7497] mt-6">
            ID de referencia: {preapprovalId}
          </p>
        )}
      </div>
    </main>
  );
}

export default function SubscriptionResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#02010F] flex items-center justify-center">
          <p className="text-[#7B7497] text-sm">Cargando...</p>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
