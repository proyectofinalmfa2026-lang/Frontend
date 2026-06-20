"use client";

import CommunityNav from "@/components/community/communityNav";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const categories = [
  {
    title: "CineSphere AI",
    desc: "Chatea con nuestra inteligencia artificial. Recomendaciones, análisis y todo sobre cine.",
    href: "/community/ai",
    icon: "🤖",
    color: "from-[#6A4E93] to-[#4A2F6F]",
    meta: "Online ahora",
  },
  {
    title: "Mensajes Directos",
    desc: "Conversaciones privadas en tiempo real con otros cinéfilos.",
    href: "/community/messages",
    icon: "💬",
    color: "from-[#3B82F6] to-[#1D4ED8]",
    meta: "Tiempo real",
  },
  {
    title: "Miembros",
    desc: "Descubre y conecta con otros amantes del cine en CineSphere.",
    href: "/community/users",
    icon: "👥",
    color: "from-[#10B981] to-[#047857]",
    meta: "Directorio",
  },
];

export default function CommunityDashboard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-linear-to-br from-[#1F1332] to-[#0D0A1A] p-8 sm:p-12">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6A4E93] opacity-10 blur-3xl" />
        <div className="relative">
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            CineSphere <span className="text-[#6A4E93]">Comunidad</span>
          </h1>
          <p className="mb-6 max-w-2xl text-[#8B7F9D]">
            Foro de cinéfilos: chatea con la IA, conversa con otros usuarios y
            descubre nuevas películas.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="font-semibold text-white">💬</span>{" "}
              <span className="text-[#8B7F9D]">Conversaciones en vivo</span>
            </div>
            <div>
              <span className="font-semibold text-white">🤖</span>{" "}
              <span className="text-[#8B7F9D]">IA de cine disponible</span>
            </div>
            <div>
              <span className="font-semibold text-white">👥</span>{" "}
              <span className="text-[#8B7F9D]">Conecta con miembros</span>
            </div>
          </div>
        </div>
      </div>

      <CommunityNav />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group rounded-xl border border-[#2A1B38] bg-[#0D0A1A] transition hover:border-[#6A4E93] hover:shadow-lg hover:shadow-[#6A4E93]/5"
          >
            <div
              className={`flex items-center gap-4 rounded-t-xl bg-linear-to-r ${cat.color} px-5 py-4`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h2 className="font-semibold text-white">{cat.title}</h2>
                <p className="text-xs text-white/70">{cat.meta}</p>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-[#8B7F9D]">{cat.desc}</p>
              {!isAuthenticated && cat.title !== "CineSphere AI" && (
                <p className="mt-2 text-xs text-[#6A4E93]">
                  Inicia sesión para participar
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
