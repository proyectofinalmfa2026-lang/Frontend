"use client";
// components/profile/tabs/activityTab.tsx
// Muestra la actividad reciente del usuario: reviews, películas agregadas, etc.
// Por ahora solo muestra reviews — cuando el backend esté listo
// se pueden agregar más tipos de eventos (watchlist, listas, etc.)

import { useState, useEffect } from "react";
import { Review } from "@/types/profile.types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
// TODO: reemplazar con reviewService.getByUser(userId)
// CÓMO CONECTAR:
//   1. Importar reviewService
//   2. Descomentar el fetch en useActivity
//   3. Borrar MOCK_ACTIVITY

const MOCK_ACTIVITY: Review[] = [
  {
    id: 1,
    movieTitle: "Inception",
    movieYear: 2010,
    posterUrl: null,
    score: 9.4,
    text: "Una obra maestra de la narrativa visual. Nolan en su máximo esplendor.",
    likes: 24,
    comments: 5,
    createdAt: "2024-05-10",
  },
  {
    id: 2,
    movieTitle: "The Dark Knight",
    movieYear: 2008,
    posterUrl: null,
    score: 9.8,
    text: "Ledger como Joker es irrepetible. La mejor película de superhéroes jamás hecha.",
    likes: 41,
    comments: 12,
    createdAt: "2024-05-05",
  },
  {
    id: 3,
    movieTitle: "Parasite",
    movieYear: 2019,
    posterUrl: null,
    score: 9.7,
    text: "Bong Joon-ho redefinió el cine de clases sociales con esta joya.",
    likes: 18,
    comments: 3,
    createdAt: "2024-04-28",
  },
  {
    id: 4,
    movieTitle: "Fight Club",
    movieYear: 1999,
    posterUrl: null,
    score: 9.3,
    text: "Primera regla: no hablar de Fight Club. Segunda regla: ver Fight Club.",
    likes: 33,
    comments: 8,
    createdAt: "2024-04-20",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useActivity(userId: number) {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // import { reviewService } from "@/services/review.services";
    //
    // reviewService
    //   .getByUser(userId)
    //   .then((data) => setItems(data))
    //   .finally(() => setLoading(false));

    // Mock temporal
    setItems(MOCK_ACTIVITY);
    setLoading(false);
  }, [userId]);

  return { items, loading };
}

// ─── Utilidad ─────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86400000,
  );
  if (days === 0) return "hoy";
  if (days === 1) return "hace 1 día";
  if (days < 7) return `hace ${days} días`;
  if (days < 30)
    return `hace ${Math.floor(days / 7)} semana${Math.floor(days / 7) > 1 ? "s" : ""}`;
  return `hace ${Math.floor(days / 30)} mes${Math.floor(days / 30) > 1 ? "es" : ""}`;
}

// ─── Subcomponente: ReviewCard ────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 flex gap-3 hover:border-[#3D3460] transition-colors">
      <div className="w-10 h-14 bg-[#02010F] border border-[#22194A] rounded flex items-center justify-center shrink-0">
        {review.posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.posterUrl}
            alt={review.movieTitle}
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
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#D6D0DC]">
          {review.movieTitle}
          <span className="text-xs text-[#7B7497] font-normal ml-1.5">
            {review.movieYear}
          </span>
        </p>
        <p className="text-xs text-[#7B7497] mt-0.5 mb-2">
          {timeAgo(review.createdAt)}
        </p>
        <p className="text-sm font-medium text-[#C13A82] mb-1.5">
          ★ {review.score}
        </p>
        <p className="text-xs text-[#7B7497] leading-relaxed line-clamp-2">
          {review.text}
        </p>
        <div className="flex items-center gap-3 mt-2.5">
          <span className="text-xs text-[#7B7497]">❤️ {review.likes}</span>
          <span className="text-xs text-[#7B7497]">💬 {review.comments}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface ActivityTabProps {
  userId: number;
}

export default function ActivityTab({ userId }: ActivityTabProps) {
  const { items, loading } = useActivity(userId);

  if (loading) return <p className="text-xs text-[#7B7497] p-4">Cargando...</p>;

  if (items.length === 0)
    return (
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 flex flex-col items-center gap-3 text-center">
        <span className="text-3xl">🎬</span>
        <p className="text-sm text-[#7B7497]">Todavía no hay actividad.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {items.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}
