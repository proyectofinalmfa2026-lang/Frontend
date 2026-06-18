"use client";

import { useAuthStore } from "@/store/authStore";
import PricingCard from "@/components/premium/pricingCard";
import UpgradeButton from "@/components/premium/upgradeButton";

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
  const { isAuthenticated } = useAuthStore();

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

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16 ">
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
            ctaLabel="Suscribirse"
          />
        </div>

        {/* Payment methods */}
        <div className="max-w-md mx-auto">
          <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-6 text-center">
            <h2 className="text-sm font-semibold text-[#D6D0DC] mb-1">
              Medios de pago disponibles
            </h2>
            <p className="text-xs text-[#7B7497] mb-5">
              Elegí el que prefieras para tu suscripción premium
            </p>

            <UpgradeButton />

            <p className="text-[10px] text-[#7B7497] mt-4">
              Cancelá cuando quieras. Sin compromiso.
            </p>
          </div>

          {/* Extra info */}
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
                <p className="text-[10px] text-[#7B7497] mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
