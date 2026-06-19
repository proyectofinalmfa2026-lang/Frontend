"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  subscribeWithMercadoPago,
  subscribeWithStripe,
  getMySubscription,
  cancelSubscription,
} from "@/services/premium.services";
import { useRouter } from "next/navigation";
import PricingCard from "@/components/premium/pricingCard";
import UpgradeButton from "@/components/premium/upgradeButton";
import StripePaymentModal from "@/components/premium/stripePaymentModal";

const FREE_FEATURES = [
  "Perfil público",
  "Reviews ilimitadas",
  "Ver reviews de la comunidad",
  "Anuncios en la plataforma",
];

const PREMIUM_FEATURES = [
  "Sin anuncios",
  "Recomendaciones con IA",
  "Badges exclusivos",
  "Acceso anticipado a nuevas funciones",
];

export default function PremiumPage() {
  const { token, user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string | null>(null);
  const [showStripeModal, setShowStripeModal] = useState(false);

  useEffect(() => {
    if (!token) return;
    getMySubscription(token)
      .then((data) => setSubscription(data))
      .catch(() => setSubscription(null));
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
    } catch {
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
    } catch {
      setError("No se pudo cancelar la suscripción.");
    } finally {
      setLoadingCancel(false);
    }
  };

  const handleSubscribeStripe = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setError("Stripe no está configurado. Avisale al administrador.");
      return;
    }
    if (!token) {
      router.push("/Login");
      return;
    }
    try {
      setLoadingStripe(true);
      setError(null);
      const data = await subscribeWithStripe(token);
      setClientSecret(data.clientSecret);
      setStripeSubscriptionId(data.subscriptionId);
      setShowStripeModal(true);
    } catch {
      setError("Hubo un error al iniciar el pago con Stripe. Intentá de nuevo.");
    } finally {
      setLoadingStripe(false);
    }
  };

  const isActive = subscription?.status === "active";

  return (
    <main className="min-h-screen bg-[#02010F] py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#C13A82]/10 border border-[#C13A82]/30 rounded-md px-3 py-1 text-xs font-medium text-[#C13A82] mb-4">
            CineSphere Premium
          </span>
          <h1 className="text-4xl font-bold text-[#D6D0DC] mb-3">
            Elegí tu plan
          </h1>
          <p className="text-[#7B7497] max-w-md mx-auto">
            Desbloqueá todas las funciones y llevá tu experiencia al siguiente
            nivel.
          </p>
        </div>

        {isActive && (
          <div className="max-w-md mx-auto mb-8 bg-[#0E0A2B] border border-[#C13A82]/30 rounded-xl p-4 text-center">
            <p className="text-[#D6D0DC] text-sm font-medium">
              Ya tenies Premium activo
            </p>
            <button
              onClick={handleCancel}
              disabled={loadingCancel}
              className="mt-2 text-xs text-[#C13A82] hover:text-[#A92F71] transition-colors cursor-pointer disabled:opacity-50"
            >
              {loadingCancel ? "Cancelando..." : "Cancelar suscripción"}
            </button>
          </div>
        )}

        {error && (
          <p className="max-w-md mx-auto mb-4 text-center text-xs text-[#C13A82]">
            {error}
          </p>
        )}

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          <PricingCard
            title="Free"
            price="$0"
            period="/mes"
            features={FREE_FEATURES}
            ctaLabel={isAuthenticated ? "Tu plan actual" : "Registrarse gratis"}
            disabled={isAuthenticated}
          />

          <PricingCard
            title="Premium"
            price="$4.99"
            period="/mes"
            features={PREMIUM_FEATURES}
            highlighted
            ctaLabel={
              loading
                ? "Procesando..."
                : isActive
                  ? "Ya sos Premium"
                  : "Suscribirse"
            }
            disabled={isActive || loading}
          />
        </div>

        {/* Payment methods */}
        {!isActive && (
          <div className="max-w-md mx-auto">
            <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-6 text-center">
              <h2 className="text-sm font-semibold text-[#D6D0DC] mb-1">
                Medios de pago disponibles
              </h2>
              <p className="text-xs text-[#7B7497] mb-5">
                Elegí el que prefieras para tu suscripción premium
              </p>

              <UpgradeButton
                onMpClick={handleSubscribe}
                onStripeClick={handleSubscribeStripe}
                mpLoading={loading}
                stripeLoading={loadingStripe}
              />

              <p className="text-[10px] text-[#7B7497] mt-4">
                Cancelá cuando quieras. Sin compromiso.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "Pago seguro", desc: "Datos encriptados" },
                { label: "Cancelación fácil", desc: "Sin cargos ocultos" },
                { label: "Soporte 24/7", desc: "Ayuda en cualquier momento" },
                {
                  label: "Sin publicidad",
                  desc: "Experiencia sin interrupciones",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#0E0A2B]/60 border border-[#22194A] rounded-lg p-3 text-center"
                >
                  <p className="text-xs font-medium text-[#D6D0DC]">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-[#7B7497] mt-0.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showStripeModal && clientSecret && stripeSubscriptionId && (
        <StripePaymentModal
          clientSecret={clientSecret}
          subscriptionId={stripeSubscriptionId}
          onClose={() => {
            setShowStripeModal(false);
            setClientSecret(null);
            setStripeSubscriptionId(null);
          }}
        />
      )}
    </main>
  );
}
