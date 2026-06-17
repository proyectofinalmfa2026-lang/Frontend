"use client";

import { useState, useEffect, useCallback } from "react";
import { Movie } from "@/types/movie.types";
import { Review } from "@/types/review.types";
import { reviewService } from "@/services/review.services";
import ReviewCard from "@/components/review/reviewCard";
import ReviewForm from "@/components/review/reviewForm";
import MovieRatingStats from "./movieRating";

interface MovieInfoProps {
  movie: Movie;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await reviewService.getByMovie(movie.id);
      setReviews(res.data);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [movie.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await reviewService.remove(reviewId);

      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Detalles */}
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
        <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-4">
          Detalles
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Género", value: movie.genre },
            { label: "Año", value: movie.year },
            { label: "Reviews", value: reviews.length },
            {
              label: "Promedio",
              value:
                reviews.length > 0
                  ? (
                      reviews.reduce((acc, r) => acc + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : "N/A",
            },
          ].map((d) => (
            <div key={d.label}>
              <p className="text-xs text-[#7B7497]">{d.label}</p>
              <p className="text-sm font-medium text-[#D6D0DC] mt-0.5">
                {d.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <MovieRatingStats reviews={reviews} />

      <ReviewForm movieId={movie.id} onSuccess={fetchReviews} />

      {/* Lista de reviews */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
          Reviews ({reviews.length})
        </p>

        {loading ? (
          <p className="text-xs text-[#7B7497] p-4">Cargando reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 flex flex-col items-center gap-3 text-center">
            <span className="text-3xl">🎬</span>
            <p className="text-sm text-[#7B7497]">
              Todavía no hay reviews. ¡Sé el primero!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showMovie={false}
              onDelete={handleDeleteReview}
            />
          ))
        )}
      </div>
    </div>
  );
}
