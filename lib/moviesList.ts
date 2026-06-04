// lib/moviesList.ts

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
}

// ─── Fallback ─────────────────────────────────────────────────────────────────

export const trendingMovies: Movie[] = [
  { id: 1, title: "Dune: Part Two", posterPath: "/dune2.jpg", rating: 8.5 },
  { id: 2, title: "Oppenheimer", posterPath: "/oppenheimer.jpg", rating: 8.8 },
  { id: 3, title: "Poor Things", posterPath: "/poor-things.jpg", rating: 8.4 },
  {
    id: 4,
    title: "The Boy and the Heron",
    posterPath: "/heron.jpg",
    rating: 8.3,
  },
  {
    id: 5,
    title: "Anatomy of a Fall",
    posterPath: "/anatomy.jpg",
    rating: 8.2,
  },
  {
    id: 6,
    title: "The Zone of Interest",
    posterPath: "/zone.jpg",
    rating: 8.1,
  },
  { id: 7, title: "Oppenheimer", posterPath: "/oppenheimer.jpg", rating: 8.8 },
  { id: 8, title: "Past Lives", posterPath: "/past-lives.jpg", rating: 8.0 },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useHeroMovies(): Movie[] {
  const [movies, setMovies] = useState<Movie[]>(trendingMovies);

  useEffect(() => {
    // TODO: reemplazar cuando el backend esté listo
    // movieService.getTrending()
    //   .then((data) => setMovies(data))
    //   .catch(() => {});
  }, []);

  return movies;
}
