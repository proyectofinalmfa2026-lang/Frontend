"use client";

import { useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuthStore } from "@/store/authStore";
import { authServices } from "@/services/auth.services";
import { confirmStripeSubscription } from "@/services/premium.services";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface Props {
  clientSecret: string;
  subscriptionId: string;
  onClose: () => void;
}

function PaymentForm({ clientSecret, subscriptionId, onClose }: Props) {
  const { token, setUser } = useAuthStore();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<
    "form" | "confirming" | "success" | "error"
  >("form");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !token) return;

    setState("confirming");
    setError(null);

    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      },
    );

    if (confirmError) {
      setError(confirmError.message ?? "Error al procesar el pago");
      setState("form");
      return;
    }

    try {
      await confirmStripeSubscription(token, subscriptionId);
      authServices.me().then((res) => {
        if (res.data) setUser(res.data);
      }).catch(() => {});
      setState("success");
    } catch {
      setMessage(
        "El pago se procesó pero hubo un error al activar tu suscripción. Contactá a soporte.",
      );
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center">
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
        <h3 className="text-lg font-semibold text-[#D6D0DC] mb-2">
          ¡Ya sos Premium!
        </h3>
        <p className="text-sm text-[#7B7497] mb-5">
          Tu suscripción está activa. Disfrutá de todos los beneficios.
        </p>
        <Link
          href="/profile"
          className="block w-full bg-[#C13A82] hover:bg-[#A92F71] text-white font-medium px-4 py-2.5 rounded-lg transition-colors text-center"
        >
          Ir a mi perfil
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-[#02010F] border border-[#22194A] rounded-lg p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#D6D0DC",
                "::placeholder": { color: "#7B7497" },
              },
              invalid: { color: "#C13A82" },
            },
          }}
        />
      </div>

      {error && <p className="text-xs text-[#C13A82] text-center">{error}</p>}
      {message && (
        <p className="text-xs text-[#F0A500] text-center">{message}</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={state === "confirming"}
          className="flex-1 border border-[#22194A] text-[#D6D0DC] font-medium px-4 py-2.5 rounded-lg hover:bg-[#0E0A2B] transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!stripe || state === "confirming"}
          className="flex-1  bg-[#C13A82] hover:bg-[#A92F71] text-white font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "confirming" ? "Procesando..." : "Pagar $4.99"}
        </button>
      </div>
    </form>
  );
}

export default function StripePaymentModal({
  clientSecret,
  subscriptionId,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-2xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-lg font-semibold text-[#D6D0DC] mb-1">
          Pagar con Stripe
        </h2>
        <p className="text-xs text-[#7B7497] mb-5">
          Ingresa los datos de tu tarjeta para pagar $4.99/mes
        </p>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            clientSecret={clientSecret}
            subscriptionId={subscriptionId}
            onClose={onClose}
          />
        </Elements>
      </div>
    </div>
  );
}
