"use client";

import { useWatched } from "@/hooks/useWatched";
import WatchedGrid from "@/components/watched/watchedGrid";
import Link from "next/link";

export default function WatchedView() {
  const { items, loading, error } = useWatched();

  return (
    <section className="min-h-screen bg-[#02010F] px-4 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[#C13A82] text-xs font-medium tracking-widest uppercase animate-pulse">
            ✦ Vistas
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#D6D0DC]">
            Películas vistas
          </h1>
          <p className="mt-2 text-[#7B7497] text-sm">
            Películas que ya viste. Explora desde{" "}
            <Link
              href="/movies"
              className="text-[#8C63C9] hover:text-[#C13A82] transition-colors underline underline-offset-2"
            >
              el catálogo
            </Link>
            .
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-[#0E0A2B] border border-[#22194A] animate-pulse"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="bg-[#0E0A2B] border border-[#C13A82]/30 rounded-2xl p-6 text-center">
            <p className="text-[#C13A82] font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm text-[#7B7497] hover:text-[#D6D0DC] transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && <WatchedGrid items={items} />}
      </div>
    </section>
  );
}
