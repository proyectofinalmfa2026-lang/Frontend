"use client";

interface Props {
  title: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  disabled?: boolean;
  ctaLabel: string;
  onCta?: () => void;
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  highlighted,
  disabled,
  ctaLabel,
}: Props) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6
          ${
            highlighted
              ? "border-[#C13A82] bg-[#0E0A2B] shadow-lg shadow-[#C13A82]/10"
              : "border-[#22194A] bg-[#0E0A2B]/60   "
          }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C13A82] text-white text-xs font-semibold px-4 py-1 rounded-full">
          Recomendado
        </span>
      )}

      <h3 className="text-lg font-semibold text-[#D6D0DC] mt-1">{title}</h3>

      <div className="mt-4">
        <span className="text-4xl font-bold text-[#D6D0DC]">{price}</span>
        <span className="text-sm text-[#7B7497] ml-1">{period}</span>
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#D6D0DC]">
            <span className="text-[#C13A82] mt-0.5 shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        disabled={disabled}
        className={`mt-8 w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        } ${
          highlighted
            ? "bg-[#C13A82] hover:bg-[#A92F71] text-white"
            : "border border-[#22194A] text-[#7B7497] hover:border-[#3D3460] hover:text-[#D6D0DC]"
        }`}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
