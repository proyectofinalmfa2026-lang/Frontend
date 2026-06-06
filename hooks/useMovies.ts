import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/services/movie.service";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}
