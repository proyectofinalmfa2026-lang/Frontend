"use client";

import { Movie } from "@/types/movie.types";
import Link from "next/link";

interface MovieHeroProps {
  movie: Movie;
}

function calcAvgRating(reviews: Movie["reviews"]): string {
  if (!reviews || reviews.length === 0) return "0.0";

  const avg =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return avg.toFixed(1);
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const avgRating = calcAvgRating(movie.reviews);

  return (
    <section className="relative overflow-hidden border-b border-[#22194A]">
      {/* Background */}
      {movie.poster && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${movie.poster})`,
            }}
          />

          <div className="absolute inset-0 bg-linear-to-b from-[#02010F]/70 via-[#02010F]/90 to-[#02010F]" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-16">
        {/* Back button */}
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 text-sm text-[#C13A82] hover:text-white transition-colors mb-8"
        >
          ← Volver a películas
        </Link>

        <div className="grid lg:grid-cols-[1fr_260px] gap-7 items-center">
          {/* Content */}
          <div>
            {/* Genre + Year */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#C13A82]/10 border border-[#C13A82]/30 text-[#C13A82] text-xs px-3 py-1 rounded-full">
                {movie.genre}
              </span>

              <span className="text-sm text-[#7B7497]">{movie.year}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {movie.title}
            </h1>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <span className="text-yellow-400 text-2xl">★</span>

              <span className="text-3xl font-bold text-white">{avgRating}</span>

              <span className="text-[#7B7497]">
                {movie.reviews?.length ?? 0} reviews
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-[#B4AEC8] leading-relaxed text-sm md:text-base">
              {movie.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                className="
              px-5 py-3
              rounded-xl
              bg-[#C13A82]
              hover:bg-[#d14b92]
              text-white
              font-medium
              transition-colors
              cursor-pointer
            "
              >
                Añadir a watchlist
              </button>
            </div>
          </div>

          {/* Poster */}
          <div className="flex justify-center lg:justify-end">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="
              w-52
              md:w-64
              rounded-2xl
              border border-[#2A204F]
              shadow-2xl
              object-cover
            "
              />
            ) : (
              <div
                className="
              w-52 md:w-64
              aspect-2/3
              rounded-2xl
              border border-[#22194A]
              bg-[#161131]
              flex items-center justify-center
            "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
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
        </div>
      </div>
    </section>
  );
}
