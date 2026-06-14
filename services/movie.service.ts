import api from "@/lib/axios";
import { Movie } from "@/types/movie.types";

export const movieService = {
  getAll: async (): Promise<Movie[]> => {
    const res = await api.get("/movies");
    return res.data;
  },

  getById: async (id: string): Promise<Movie> => {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  },
};
