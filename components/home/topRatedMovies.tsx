"use client";

import Link from "next/link";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/types/movie.types";

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-medium z-10 ${
        rank === 1
          ? "bg-[#C13A82] text-white"
          : "bg-[#02010F]/80 border border-[#22194A] text-[#7B7497]"
      }`}
    >
      #{rank}
    </span>
  );
}

function PosterPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0E0A2B]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#f8f8f8]"
      >
        <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
      </svg>
    </div>
  );
}

function getMovieScore(movie: Movie) {
  const reviews = movie.reviews ?? [];

  if (reviews.length === 0) {
    return "N/A";
  }

  return (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);
}

// (top 3)
function TopCard({ movie, rank }: { movie: Movie; rank: number }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden hover:border-[#3D3460] transition-colors h-full flex flex-row cursor-pointer">
        <div className="relative w-24 sm:w-32 shrink-0">
          <RankBadge rank={rank} />

          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <PosterPlaceholder />
          )}
        </div>

        <div className="p-2.5 sm:p-3 flex flex-col gap-1 sm:gap-1.5 flex-1 justify-center">
          <p className="text-xs sm:text-sm font-medium text-[#D6D0DC] truncate">
            {movie.title}
          </p>

          <p className="text-[10px] sm:text-xs text-[#7B7497]">
            {movie.year} · Próximamente
          </p>

          <p className="text-xs sm:text-sm font-medium text-[#C13A82] flex items-center gap-1">
            ★ {getMovieScore(movie)}
            <span className="text-[10px] sm:text-xs text-[#7B7497] font-normal">
              (N/A)
            </span>
          </p>

          {movie.description && (
            <p className="hidden sm:block text-xs text-[#7B7497] leading-relaxed line-clamp-3 mt-1">
              {movie.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

//  Responsive (#4 al #10) — desktop
function PosterCard({ movie, rank }: { movie: Movie; rank: number }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="cursor-pointer group">
        <div className="relative rounded-lg overflow-hidden border border-[#22194A] group-hover:border-[#3D3460] transition-colors aspect-2/3 w-full">
          <RankBadge rank={rank} />

          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-bottom object-cover"
            />
          ) : (
            <PosterPlaceholder />
          )}
        </div>

        <p className="text-[10px] sm:text-xs font-medium text-[#D6D0DC] mt-1.5 truncate">
          {movie.title}
        </p>

        <p className="text-[10px] sm:text-xs text-[#C13A82] font-medium mt-0.5">
          ★ {getMovieScore(movie)}
        </p>
      </div>
    </Link>
  );
}

// Row horizontal para mobile (#4 al #10)
function MobileRow({ movie, rank }: { movie: Movie; rank: number }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#22194A] rounded-lg p-2.5 hover:border-[#3D3460] transition-colors cursor-pointer">
        <span className="text-xs font-medium text-[#7B7497] w-6 shrink-0">
          #{rank}
        </span>

        <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden border border-[#22194A]">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <PosterPlaceholder />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[#D6D0DC] truncate">
            {movie.title}
          </p>

          <p className="text-[10px] text-[#7B7497] mt-0.5">
            {movie.year} · Próximamente
          </p>
        </div>

        <span className="text-xs font-medium text-[#C13A82] shrink-0">
          ★ {getMovieScore(movie)}
        </span>
      </div>
    </Link>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────

export default function TopRatedMovies() {
  const { movies } = useMovies();

  const top3 = movies.slice(0, 3);
  const rest = movies.slice(3, 10);

  return (
    <section className="py-8 px-8 bg-[#02010F]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <h2 className="text-lg sm:text-xl font-medium text-[#D6D0DC]">
          Mejores 10 en CineSphere esta semana
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#7B7497]"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>

      {/* Top 3 — siempre 3 columnas */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
        {top3.map((movie, i) => (
          <TopCard key={movie.id} movie={movie} rank={i + 1} />
        ))}
      </div>

      {/* #4 al #10 — grid en desktop, lista en mobile */}
      <div className="hidden sm:grid sm:grid-cols-7 gap-2">
        {rest.map((movie, i) => (
          <PosterCard key={movie.id} movie={movie} rank={i + 4} />
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:hidden">
        {rest.map((movie, i) => (
          <MobileRow key={movie.id} movie={movie} rank={i + 4} />
        ))}
      </div>
    </section>
  );
}
