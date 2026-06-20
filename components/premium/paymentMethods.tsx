"use client";

import UpgradeButton from "./upgradeButton";

interface Props {
  onMpClick: () => void;
  onStripeClick: () => void;
  mpLoading: boolean;
  stripeLoading: boolean;
}

const BENEFITS = [
  { label: "Pago seguro", desc: "Datos encriptados" },
  { label: "Cancelación fácil", desc: "Sin cargos ocultos" },
  { label: "Soporte 24/7", desc: "Ayuda en cualquier momento" },
  { label: "Sin publicidad", desc: "Experiencia sin interrupciones" },
];

export default function PaymentMethods({ onMpClick, onStripeClick, mpLoading, stripeLoading }: Props) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-6 text-center">
        <h2 className="text-sm font-semibold text-[#D6D0DC] mb-1">
          Medios de pago disponibles
        </h2>
        <p className="text-xs text-[#7B7497] mb-5">
          Elegí el que prefieras para tu suscripción premium
        </p>

        <UpgradeButton
          onMpClick={onMpClick}
          onStripeClick={onStripeClick}
          mpLoading={mpLoading}
          stripeLoading={stripeLoading}
        />

        <p className="text-[10px] text-[#7B7497] mt-4">
          Cancelá cuando quieras. Sin compromiso.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {BENEFITS.map((item) => (
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
  );
}
