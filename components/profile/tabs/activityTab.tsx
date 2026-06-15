"use client";

import { useState, useEffect } from "react";
import { reviewService } from "@/services/review.services";
import ReviewCard from "../reviewCard";
import EmptyState from "@/components/common/emptyState";
// ─── Hook ─────────────────────────────────────────────────────────────────────

function useActivity(userId: number) {
  const [items, setItems] = useState<any[]>([]);
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

        setItems(mappedReviews);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [userId]);

  return { items, loading };
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface ActivityTabProps {
  userId: number;
}

export default function ActivityTab({ userId }: ActivityTabProps) {
  const { items, loading } = useActivity(userId);

  if (loading) return <p className="text-xs text-[#7B7497] p-4">Cargando...</p>;

  if (items.length === 0)
    return <EmptyState message="Todavía no hay actividad." />;

  return (
    <div className="flex flex-col gap-3">
      {items.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}
