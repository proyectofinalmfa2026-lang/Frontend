"use client";

import { Movie } from "@/types/movie.types";
import { timeAgo } from "@/lib/timeAgo";

interface MovieInfoProps {
  movie: Movie;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  const reviews = movie.reviews ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Detalles */}
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5 flex flex-col gap-3">
        <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
          Detalles
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Género", value: movie.genre },
            { label: "Año", value: movie.year },
            { label: "Reviews", value: reviews.length },
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

      {/* Reviews */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
          Reviews ({reviews.length})
        </p>

        {reviews.length === 0 ? (
          <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 flex flex-col items-center gap-3 text-center">
            <span className="text-3xl">🎬</span>
            <p className="text-sm text-[#7B7497]">
              Todavía no hay reviews para esta película.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 flex flex-col gap-2 hover:border-[#3D3460] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#C13A82]">
                  ★ {review.rating}
                </span>
                <span className="text-xs text-[#7B7497]">
                  {timeAgo(review.createdAt)}
                </span>
              </div>
              <p className="text-sm text-[#7B7497] leading-relaxed">
                {review.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
