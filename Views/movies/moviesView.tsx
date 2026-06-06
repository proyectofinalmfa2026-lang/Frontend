"use client";

import { useState } from "react";
import MovieFilters from "@/components/movie/movieFilters";
import MovieGrid from "@/components/movie/movieGrid";

const movies = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Película ${index + 1}`,
  rating: 4.3,
  description: "Descripción de prueba",
  genre: index % 2 === 0 ? "Acción" : "Drama",
}));

export default function MoviesView() {
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "Todos" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <section className="bg-[#02010F] min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 duration-150">
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
