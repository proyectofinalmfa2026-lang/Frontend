"use client";

import { Review } from "@/types/review.types";
import { timeAgo } from "@/lib/timeAgo";

interface ReviewCardProps {
  review: Review;
  showMovie?: boolean; // en el perfil mostramos la película, en la página de movie no
}

export default function ReviewCard({
  review,
  showMovie = true,
}: ReviewCardProps) {
  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 flex flex-col gap-3 hover:border-[#3D3460] transition-colors">
      {/* Header — usuario + fecha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {review.user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.user.avatar}
              alt={review.user.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-white text-xs font-medium">
              {review.user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-[#D6D0DC]">
              {review.user.name}
            </p>
            <p className="text-[10px] text-[#7B7497]">
              @{review.user.username}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#C13A82]">
            ★ {review.rating}/10
          </span>
          <span className="text-xs text-[#7B7497]">
            {timeAgo(review.createdAt)}
          </span>
        </div>
      </div>

      {/* Película — solo si showMovie=true */}
      {showMovie && (
        <div className="flex items-center gap-2 bg-[#02010F] border border-[#22194A] rounded-lg px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#7B7497]"
          >
            <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
          </svg>
          <span className="text-xs text-[#7B7497]">
            {review.movie.title}
            <span className="ml-1 text-[#3D3460]">{review.movie.year}</span>
          </span>
        </div>
      )}

      {/* Comentario */}
      <p className="text-sm text-[#7B7497] leading-relaxed">{review.comment}</p>
    </div>
  );
}
