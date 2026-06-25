"use client";

import { useState } from "react";
import MovieFilters from "@/components/movie/movieFilters";
import MovieGrid from "@/components/movie/movieGrid";
import { useMovies } from "@/hooks/useMovies";
import Loading from "@/components/ui/loading";

export default function MoviesView() {
  const { movies, loading, error } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre =
      selectedGenre === "Todos" || movie.genre?.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="bg-[#02010F] min-h-screen flex items-center justify-center">
        <p className="text-white/50 text-sm">{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-[#02010F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MovieFilters
          search={search}
          setSearch={setSearch}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <MovieGrid movies={filteredMovies} />
      </div>
    </section>
  );
}
