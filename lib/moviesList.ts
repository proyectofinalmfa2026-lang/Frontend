// lib/moviesList.ts - SOLO DATOS, SIN HOOKS!
export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
}

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
  { id: 7, title: "Past Lives", posterPath: "/past-lives.jpg", rating: 8.0 },
  {
    id: 8,
    title: "Killers of the Flower Moon",
    posterPath: "/killers.jpg",
    rating: 8.4,
  },
];
