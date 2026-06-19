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
    <div className="p-6">
      <h1>En construcción</h1>
      <p>Esta sección estará disponible próximamente.</p>
    </div>
  );
}