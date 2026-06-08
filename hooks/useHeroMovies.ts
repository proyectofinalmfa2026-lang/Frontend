// hooks/useHeroMovies.ts (solo si vas a conectar API)
"use client";

import { useState, useEffect } from "react";
import { Movie, trendingMovies } from "@/lib/moviesList";

export const useHeroMovies = () => {
  const [movies, setMovies] = useState<Movie[]>(trendingMovies);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Conectar con API real
    // const fetchMovies = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await movieService.getTrending();
    //     setMovies(data);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchMovies();
  }, []);

  return { movies, loading };
};
