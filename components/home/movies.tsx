"use client";

import Link from "next/link";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/types/movie.types";

const MAX_POPULAR_MOVIES = 8;

function getMovieRating(movie: Movie) {
  const reviews = movie.reviews ?? [];

  if (reviews.length > 0) {
    return (
      reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    );
  }

  return movie.rating ?? 0;
}

function PosterPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0E0A2B] text-[#7B7497]">
      Sin póster
    </div>
  );
}

export default function Movies() {
  const { movies, loading, error } = useMovies();

  const popularMovies = [...movies]
    .sort((a, b) => getMovieRating(b) - getMovieRating(a))
    .slice(0, MAX_POPULAR_MOVIES);

  return (
    <section className="bg-[#02010F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="mb-10 text-center">
          <span className="text-[#C13A82] text-sm font-medium">
            ✦ Destacadas
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#D6D0DC]">
            Películas Populares
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#7B7497] max-w-2xl mx-auto">
            Descubre algunas de las películas mejor valoradas por la comunidad.
          </p>
        </div>

        {loading && (
          <p className="py-12 text-center text-[#7B7497]">
            Cargando películas...
          </p>
        )}

        {!loading && error && (
          <p className="py-12 text-center text-red-400">{error}</p>
        )}

        {!loading && !error && popularMovies.length === 0 && (
          <p className="py-12 text-center text-[#7B7497]">
            Aún no hay películas disponibles.
          </p>
        )}

        {!loading && !error && popularMovies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularMovies.map((movie) => {
              const rating = getMovieRating(movie);

              return (
                <div
                  key={movie.id}
                  className="flex flex-col bg-[#0E0A2B] border border-[#22194A] rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-[#8C63C9] transition-all duration-300"
                >
                  <div className="relative w-full h-72 sm:h-80">
                    {movie.poster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                    ) : (
                      <PosterPlaceholder />
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(rating)
                              ? "text-yellow-400"
                              : "text-[#7B7497]"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-[#D6D0DC] font-semibold">
                        {rating > 0 ? rating.toFixed(1) : "N/A"}
                      </span>
                    </div>

                    <h3 className="text-[#D6D0DC] font-semibold text-lg line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-[#7B7497] text-sm mt-2 line-clamp-2 flex-1">
                      {movie.description}
                    </p>

                    <Link
                      href={`/movies/${movie.id}`}
                      className="w-full mt-4 bg-[#C13A82] hover:bg-[#A92F71] text-white py-2.5 rounded-lg transition-colors text-center"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            href="/movies"
            className="px-8 py-3 border border-[#8C63C9] text-[#8C63C9] rounded-xl hover:bg-[#8C63C9] hover:text-white transition-colors"
          >
            Ver todas las películas
          </Link>
        </div>
      </div>
    </section>
  );
}
