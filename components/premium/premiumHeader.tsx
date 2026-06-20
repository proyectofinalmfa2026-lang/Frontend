"use client";

export default function PremiumHeader() {
  return (
    <div className="text-center mb-12">
      <span className="inline-flex items-center gap-1.5 bg-[#C13A82]/10 border border-[#C13A82]/30 rounded-md px-3 py-1 text-xs font-medium text-[#C13A82] mb-4">
        CineSphere Premium
      </span>
      <h1 className="text-4xl font-bold text-[#D6D0DC] mb-3">
        Elegí tu plan
      </h1>
      <p className="text-[#7B7497] max-w-md mx-auto">
        Desbloqueá todas las funciones y llevá tu experiencia al siguiente nivel.
      </p>
    </div>
  );
}
