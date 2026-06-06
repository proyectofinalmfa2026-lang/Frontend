"use client";
// components/profile/tabs/reviewsTab.tsx
// Lista todas las reviews del usuario, con filtro por score.
// Mismo contenido que activityTab por ahora, pero con lógica propia
// para cuando el backend tenga un endpoint separado de reviews.

import { useState, useEffect } from "react";
import { Review } from "@/types/profile.types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
// TODO: reemplazar con reviewService.getByUser(userId)

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    movieTitle: "Inception",
    movieYear: 2010,
    posterUrl: null,
    score: 9.4,
    text: "Una obra maestra de la narrativa visual.",
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
    text: "Ledger como Joker es irrepetible.",
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
    text: "Bong Joon-ho redefinió el cine de clases sociales.",
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
    text: "Primera regla: no hablar de Fight Club.",
    likes: 33,
    comments: 8,
    createdAt: "2024-04-20",
  },
  {
    id: 5,
    movieTitle: "Interstellar",
    movieYear: 2014,
    posterUrl: null,
    score: 8.9,
    text: "Visualmente impresionante, emocionalmente devastadora.",
    likes: 29,
    comments: 6,
    createdAt: "2024-04-10",
  },
  {
    id: 6,
    movieTitle: "Pulp Fiction",
    movieYear: 1994,
    posterUrl: null,
    score: 9.5,
    text: "Tarantino en estado puro. Diálogos inmortales.",
    likes: 37,
    comments: 9,
    createdAt: "2024-04-01",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useReviews(userId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // import { reviewService } from "@/services/review.services";
    //
    // reviewService
    //   .getByUser(userId)
    //   .then((data) => setReviews(data))
    //   .finally(() => setLoading(false));

    // Mock temporal
    setReviews(MOCK_REVIEWS);
    setLoading(false);
  }, [userId]);

  return { reviews, loading };
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

// ─── Subcomponentes ───────────────────────────────────────────────────────────

// Filtros de score — permite filtrar reviews por rango
const SCORE_FILTERS = [
  { label: "Todas", min: 0 },
  { label: "9+", min: 9 },
  { label: "8+", min: 8 },
  { label: "7+", min: 7 },
];

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

interface ReviewsTabProps {
  userId: number;
}

export default function ReviewsTab({ userId }: ReviewsTabProps) {
  const { reviews, loading } = useReviews(userId);
  const [minScore, setMinScore] = useState(0);

  // Filtramos las reviews según el score mínimo seleccionado
  const filtered = reviews.filter((r) => r.score >= minScore);

  if (loading) return <p className="text-xs text-[#7B7497] p-4">Cargando...</p>;

  return (
    <div className="flex flex-col gap-3">
      {/* Filtros */}
      <div className="flex items-center gap-2">
        {SCORE_FILTERS.map((f) => (
          <button
            key={f.label}
            onClick={() => setMinScore(f.min)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
              minScore === f.min
                ? "bg-[#C13A82]/10 border-[#C13A82]/30 text-[#C13A82]"
                : "border-[#22194A] text-[#7B7497] hover:border-[#3D3460]"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="text-xs text-[#7B7497] ml-auto">
          {filtered.length} reviews
        </span>
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 flex flex-col items-center gap-3 text-center">
          <span className="text-3xl">🎬</span>
          <p className="text-sm text-[#7B7497]">
            No hay reviews con ese filtro.
          </p>
        </div>
      ) : (
        filtered.map((r) => <ReviewCard key={r.id} review={r} />)
      )}
    </div>
  );
}
