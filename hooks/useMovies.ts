import { useState, useEffect } from "react";
import { Movie } from "@/types/movie.types";
import { movieService } from "@/services/movie.service";

export function useMovie(id: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    console.log("Fetching movie con id:", id); // ← agregá esto
    setLoading(true);
    movieService
      .getById(id)
      .then((data) => {
        console.log("Movie data:", data); // ← y esto
        setMovie(data);
      })
      .catch((err) => {
        console.error("Error fetching movie:", err); // ← y esto
        setError("No se pudo cargar la película");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    movieService
      .getAll()
      .then((data) => setMovies(data))
      .catch(() => setError("No se pudieron cargar las películas"))
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading, error };
}
