"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Props {
  clientSecret: string;
  onSuccess: () => void;
  onClose: () => void;
}

function PaymentForm({ clientSecret, onSuccess, onClose }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Error al procesar el pago");
      setProcessing(false);
    } else {
      onSuccess();
    }
  };

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

      {error && (
        <p className="text-xs text-[#C13A82] text-center">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={processing}
          className="flex-1 border border-[#22194A] text-[#D6D0DC] font-medium px-4 py-2.5 rounded-lg hover:bg-[#0E0A2B] transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-[#635BFF] hover:bg-[#4F46E5] text-white font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? "Procesando..." : "Pagar $4.99"}
        </button>
      </div>
    </form>
  );
}

export default function StripePaymentModal({ clientSecret, onSuccess, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-2xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-lg font-semibold text-[#D6D0DC] mb-1">
          Pagar con Stripe
        </h2>
        <p className="text-xs text-[#7B7497] mb-5">
          Ingresá los datos de tu tarjeta para pagar $4.99/mes
        </p>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            clientSecret={clientSecret}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </Elements>
      </div>
    </div>
  );
}
