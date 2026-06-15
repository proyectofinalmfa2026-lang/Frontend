"use client";

import { useState, useEffect } from "react";
import { reviewService } from "@/services/review.services";
import ReviewCard from "../reviewCard";

import EmptyState from "@/components/common/emptyState";

function useReviews(userId: number) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    reviewService
      .getByUser(userId)
      .then((res) => {
        const mappedReviews = res.data.map((review: any) => ({
          id: review.id,
          movieTitle: review.movie.title,
          movieYear: review.movie.year,
          posterUrl: review.movie.poster,
          score: review.rating,
          text: review.comment,
          likes: 0,
          comments: 0,
          createdAt: review.createdAt,
        }));

        setReviews(mappedReviews);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [userId]);
  return { reviews, loading };
}

// Filtros de score — permite filtrar reviews por rango
const SCORE_FILTERS = [
  { label: "Todas", min: 0 },
  { label: "9+", min: 9 },
  { label: "8+", min: 8 },
  { label: "7+", min: 7 },
];

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
      {filtered.length === 0 ? (
        <EmptyState message="No hay reviews con ese filtro." />
      ) : (
        filtered.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </div>
  );
}
