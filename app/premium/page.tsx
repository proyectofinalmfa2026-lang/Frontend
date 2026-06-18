"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { subscribeWithMercadoPago, getMySubscription, cancelSubscription } from "@/services/premium.services";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const { token, user } = useAuthStore();
  const router = useRouter();

  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!token) return;
  getMySubscription(token)
    .then((data) => {
      console.log('subscription data:', data);
      setSubscription(data);
    })
    .catch((err) => {
      console.log('subscription error:', err);
      setSubscription(null);
    });
}, [token]);

  const handleSubscribe = async () => {
    if (!token) {
      router.push("/Login");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { initPoint } = await subscribeWithMercadoPago(token);
      window.location.href = initPoint;
    } catch (err: any) {
      setError("Hubo un error al iniciar el pago. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!token) return;
    try {
      setLoadingCancel(true);
      await cancelSubscription(token);
      setSubscription(null);
    } catch (err: any) {
      setError("No se pudo cancelar la suscripción.");
    } finally {
      setLoadingCancel(false);
    }
  };

  const isActive = subscription?.status === "active";
  const isPending = subscription?.status === "pending";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-xl p-8 border border-red-900">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-500 mb-2">CineSphere Premium</h1>
          <p className="text-gray-400">Accedé a todas las funciones exclusivas</p>
        </div>

        {/* Beneficios */}
        <ul className="space-y-3 mb-8">
          {[
            "Sin publicidad",
            "Reseñas ilimitadas",
            "Acceso anticipado a funciones nuevas",
            "Badge Premium en tu perfil",
          ].map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-gray-300">
              <span className="text-red-500 font-bold">✓</span>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Precio */}
        <div className="text-center mb-8">
          <span className="text-4xl font-bold text-white">$4.99</span>
          <span className="text-gray-400 ml-2">USD / mes</span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        {/* Estado suscripción */}
        {isActive && (
          <div className="text-center mb-4">
            <span className="bg-red-900 text-red-300 px-4 py-1 rounded-full text-sm font-medium">
              ✓ Suscripción activa
            </span>
          </div>
        )}

        {isPending && (
          <div className="text-center mb-4">
            <span className="bg-yellow-900 text-yellow-300 px-4 py-1 rounded-full text-sm font-medium">
              ⏳ Pago pendiente de confirmación
            </span>
          </div>
        )}

        {/* Botones */}
        {!isActive && !isPending && (
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? "Redirigiendo..." : "Suscribirme con MercadoPago"}
          </button>
        )}

        {isActive && (
          <button
            onClick={handleCancel}
            disabled={loadingCancel}
            className="w-full border border-red-700 hover:bg-red-950 disabled:opacity-50 text-red-400 font-semibold py-3 rounded-xl transition-colors"
          >
            {loadingCancel ? "Cancelando..." : "Cancelar suscripción"}
          </button>
        )}
      </div>
    </div>
  );
}