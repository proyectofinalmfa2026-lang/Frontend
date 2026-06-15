"use client";

import { Movie } from "@/types/movie.types";
import Link from "next/link";

interface MovieHeroProps {
  movie: Movie;
}

function calcAvgRating(reviews: Movie["reviews"]): string {
  if (!reviews || reviews.length === 0) return "Sin rating";
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return avg.toFixed(1);
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const avgRating = calcAvgRating(movie.reviews);

  return (
    <div className=" bg-[#0E0A2B] border-b border-[#22194A]">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 ">
        <Link
          href="/movies"
          className="text-sm hover:underline font-medium block text-[#C13A82] mb-8"
        >
          ← Volver
        </Link>
        {/* Poster */}
        <div className="w-40 md:w-52 shrink-0">
          {movie.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-xl  border border-[#22194A] object-cover"
            />
          ) : (
            <div className="w-full aspect-2/3 rounded-xl border border-[#22194A] bg-[#161131] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
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
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#C13A82]/10 border border-[#C13A82]/30 text-[#C13A82] text-xs px-2.5 py-1 rounded-full">
              {movie.genre}
            </span>
            <span className="text-xs text-[#7B7497]">{movie.year}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#D6D0DC]">
            {movie.title}
          </h1>

          <p className="text-sm text-[#7B7497] leading-relaxed max-w-xl">
            {movie.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-[#D6D0DC] font-medium">{avgRating}</span>
            <span className="text-xs text-[#7B7497]">
              ({movie.reviews?.length ?? 0} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
