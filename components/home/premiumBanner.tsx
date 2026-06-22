"use client";
// components/home/premiumBanner.tsx

import Link from "next/link";

const BENEFITS = [
  "Sin anuncios en toda la plataforma",
  "Recomendaciones personalizadas con IA",
  "Estadísticas avanzadas de tu perfil",
  "Listas ilimitadas y watchlists privadas",
  "Acceso anticipado a nuevas funciones",
];

export default function PremiumBanner() {
  return (
    <section className="bg-[#02010F] py-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#050217] border border-[#22194A] rounded-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 px-8 py-10">
            {/* IZQUIERDA */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-[#C13A82]/10 border border-[#C13A82]/30 rounded-md px-2.5 py-1 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#C13A82]"
                >
                  <path d="M2 4l3 12h14l3-12-6 5-4-7-4 7-6-5z" />
                </svg>

                <span className="text-xs font-medium text-[#C13A82]">
                  CineSphere Premium
                </span>
              </div>

              <h2 className="text-4xl font-semibold text-[#D6D0DC] leading-tight mb-3">
                Llevá tu experiencia
                <br />
                al siguiente <span className="text-[#C13A82]">nivel</span>
              </h2>

              <p className="text-[#7B7497] mb-6">
                Todo lo que amás de CineSphere, sin límites.
              </p>

              <ul className="space-y-3 mb-8">
                {BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-[#D6D0DC]"
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#C13A82]/15 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#C13A82]"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>

                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <Link
                  href="/premium"
                  className="bg-[#C13A82] hover:bg-[#A92F71] text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Ver planes
                </Link>
              </div>
            </div>

            {/* DERECHA */}
            <div className="shrink-0">
              <div className="bg-[#08041F] border border-[#22194A] rounded-2xl p-8 w-65 text-center">
                <p className="text-sm text-[#7B7497] mb-3">Precio mensual</p>

                <p className="text-5xl font-bold text-[#D6D0DC]">
                  $4
                  <span className="text-xl text-[#7B7497] font-normal">
                    .99
                  </span>
                </p>

                <p className="text-[#7B7497] mt-2">por mes</p>

                <div className="h-px bg-[#22194A] my-5" />

                <p className="text-sm text-[#7B7497]">o $39.99 al año</p>

                <p className="text-[#C13A82] text-sm mt-1">Ahorrás 33%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
