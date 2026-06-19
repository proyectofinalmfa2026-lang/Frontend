"use client";

interface Props {
  onMpClick?: () => void;
  onStripeClick?: () => void;
  mpLoading?: boolean;
  stripeLoading?: boolean;
}

export default function UpgradeButton({
  onMpClick,
  onStripeClick,
  mpLoading,
  stripeLoading,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={onMpClick}
        disabled={mpLoading}
        className="flex items-center justify-center gap-2 bg-[#009EE3] hover:bg-[#0082C0] text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1"
      >
        {mpLoading ? (
          "Procesando..."
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
            </svg>
            Mercado Pago
          </>
        )}
      </button>

      <button
        onClick={onStripeClick}
        disabled={stripeLoading}
        className="flex items-center justify-center gap-2 bg-[#635BFF] hover:bg-[#4F46E5] text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1"
      >
        {stripeLoading ? (
          "Procesando..."
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
            </svg>
            Stripe
          </>
        )}
      </button>
    </div>
  );
}
