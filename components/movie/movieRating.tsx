"use client";

import { Review } from "@/types/review.types";

interface Props {
  reviews: Review[];
}

export default function MovieRatingStats({ reviews }: Props) {
  const totalReviews = reviews.length;

  const average =
    totalReviews > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;

    return {
      star,
      count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    };
  });

  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
      <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-6">
        Community Rating
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center justify-center lg:min-w-45">
          <span className="text-5xl font-bold text-white">{average}</span>

          <span className="text-yellow-400 text-xl mt-1">★★★★★</span>

          <p className="text-sm text-[#7B7497] mt-2">{totalReviews} reviews</p>
        </div>

        <div className="flex-1 space-y-3">
          {distribution.map((item) => (
            <div key={item.star} className="flex items-center gap-3">
              <span className="text-sm text-[#D6D0DC] w-8">{item.star}★</span>

              <div className="flex-1 h-2 bg-[#1B143B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>

              <span className="text-xs text-[#7B7497] w-8 text-right">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
