"use client";

import { use } from "react";
import { useMovie } from "@/hooks/useMovies";
import MovieHero from "@/components/movie/movieHero";
import MovieInfo from "@/components/movie/movieInfo";

interface Props {
  params: Promise<{ id: string }>;
}

export default function MoviePage({ params }: Props) {
  const { id } = use(params);
  const { movie, loading, error } = useMovie(id);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#02010F] flex items-center justify-center">
        <p className="text-white/50 text-sm">Cargando película...</p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-[#02010F] flex items-center justify-center">
        <p className="text-white/50 text-sm">No se encontró la película.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#02010F]">
      <MovieHero movie={movie} />
      <MovieInfo movie={movie} />
    </main>
  );
}
