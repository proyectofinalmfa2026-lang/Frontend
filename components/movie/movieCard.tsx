import Link from "next/link";
import { Movie } from "@/types/movie.types";
import AddToWatchlistButton from "@/components/watchlist/addTowatchlistButton";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const reviews = movie.reviews ?? [];
  const rating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "Sin rating";

  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-2xl overflow-hidden hover:border-[#8C63C9] hover:-translate-y-2 transition-all">
      {/* Poster con botón de watchlist encima */}
      <div className="relative h-72 bg-[#161131] flex items-center justify-center">
        {movie.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
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
            aria-hidden="true"
          >
            <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
          </svg>
        )}

        {/* Botón watchlist — esquina superior derecha */}
        <div className="absolute top-2 right-2">
          <AddToWatchlistButton movieId={movie.id} variant="icon" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400">★</span>
          <span className="text-[#D6D0DC] text-sm">{rating}</span>
          <span className="text-[#7B7497] text-xs ml-auto">{movie.year}</span>
        </div>

        <h3 className="text-[#D6D0DC] font-semibold">{movie.title}</h3>
        <p className="text-[#7B7497] text-sm mt-2 line-clamp-2">
          {movie.description}
        </p>

        <Link
          href={`/movies/${movie.id}`}
          className="mt-4 w-full block text-center bg-[#C13A82] hover:bg-[#A92F71] text-white py-2.5 rounded-lg transition-colors"
        >
          Ver mas
        </Link>
      </div>
    </div>
  );
}
