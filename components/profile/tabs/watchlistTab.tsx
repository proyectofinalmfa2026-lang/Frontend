"use client";
// components/profile/tabs/watchlistTab.tsx

import { useState, useEffect } from "react";

// ─── Type ─────────────────────────────────────────────────────────────────────

interface WatchlistItem {
  id: number;
  movieTitle: string;
  movieYear: number;
  posterUrl: string | null;
  addedAt: string;
}

// ─── Mock ─────────────────────────────────────────────────────────────────────
// TODO: reemplazar con watchlistService.getByUser(userId)
// CÓMO CONECTAR:
//   1. import { watchlistService } from "@/services/watchlist.service" (pendiente de crear)
//   2. Descomentar el fetch en useWatchlist
//   3. Borrar MOCK_WATCHLIST

const MOCK_WATCHLIST: WatchlistItem[] = [
  {
    id: 1,
    movieTitle: "Dune: Part Two",
    movieYear: 2024,
    posterUrl: null,
    addedAt: "2024-05-12",
  },
  {
    id: 2,
    movieTitle: "Oppenheimer",
    movieYear: 2023,
    posterUrl: null,
    addedAt: "2024-05-08",
  },
  {
    id: 3,
    movieTitle: "Poor Things",
    movieYear: 2023,
    posterUrl: null,
    addedAt: "2024-05-01",
  },
  {
    id: 4,
    movieTitle: "Past Lives",
    movieYear: 2023,
    posterUrl: null,
    addedAt: "2024-04-22",
  },
  {
    id: 5,
    movieTitle: "The Zone of Interest",
    movieYear: 2023,
    posterUrl: null,
    addedAt: "2024-04-15",
  },
  {
    id: 6,
    movieTitle: "Anatomy of a Fall",
    movieYear: 2023,
    posterUrl: null,
    addedAt: "2024-04-10",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useWatchlist(userId: number) {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // import { watchlistService } from "@/services/watchlist.service";
    //
    // watchlistService
    //   .getByUser(userId)
    //   .then((data) => setItems(data))
    //   .finally(() => setLoading(false));

    // Mock temporal
    setItems(MOCK_WATCHLIST);
    setLoading(false);
  }, [userId]);

  return { items, loading };
}

// ─── Subcomponente: WatchlistCard ─────────────────────────────────────────────

function WatchlistCard({ item }: { item: WatchlistItem }) {
  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-3 flex gap-3 hover:border-[#3D3460] transition-colors cursor-pointer">
      <div className="w-10 h-14 bg-[#02010F] border border-[#22194A] rounded flex items-center justify-center shrink-0">
        {item.posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.posterUrl}
            alt={item.movieTitle}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#3D3460]"
          >
            <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className="text-sm font-medium text-[#D6D0DC] truncate">
          {item.movieTitle}
        </p>
        <p className="text-xs text-[#7B7497] mt-0.5">{item.movieYear}</p>
      </div>
      {/* Botón quitar de watchlist — conectar con watchlistService.remove(id) */}
      <button className="text-xs text-[#7B7497] hover:text-[#C13A82] transition-colors shrink-0 self-center">
        ✕
      </button>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface WatchlistTabProps {
  userId: number;
}

export default function WatchlistTab({ userId }: WatchlistTabProps) {
  const { items, loading } = useWatchlist(userId);

  if (loading) return <p className="text-xs text-[#7B7497] p-4">Cargando...</p>;

  if (items.length === 0)
    return (
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 flex flex-col items-center gap-3 text-center">
        <span className="text-3xl">🎬</span>
        <p className="text-sm text-[#7B7497]">Tu watchlist está vacía.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[#7B7497]">
        {items.length} películas guardadas
      </p>
      {items.map((item) => (
        <WatchlistCard key={item.id} item={item} />
      ))}
    </div>
  );
}
