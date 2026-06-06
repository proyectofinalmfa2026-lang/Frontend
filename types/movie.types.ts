export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;

  description?: string;
  genres?: string[];
  releaseDate?: string;
}
