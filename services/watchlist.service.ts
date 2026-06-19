import api from "@/lib/axios";

export interface WatchlistItem {
  id: number;
  movie: {
    id: string;
    title: string;
    year: number;
    poster: string | null;
    genre: string;
    rating?: number;
  };
  createdAt: string;
}

export const watchlistService = {
  // GET /watchlists/me
  getMyWatchlist: () => api.get<WatchlistItem[]>("/watchlists/me"),

  // POST /watchlists
  addMovie: (movieId: string) => api.post("/watchlists", { movieId }),

  // DELETE /watchlists/:movieId
  removeMovie: (movieId: string) => api.delete(`/watchlists/${movieId}`),
};
