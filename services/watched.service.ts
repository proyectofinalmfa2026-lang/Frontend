import api from "@/lib/axios";

export interface WatchedItem {
  id: number;
  movie: {
    id: string;
    title: string;
    year: number;
    poster: string | null;
    genre: string;
    rating?: number;
  };
  watchedAt: string;
}

export const watchedService = {
  getMyWatched: () => api.get<WatchedItem[]>("/watched/me"),
  getUserWatched: (userId: number) =>
    api.get<WatchedItem[]>(`/watched/user/${userId}`),
  checkWatched: (movieId: string) =>
    api.get<{ watched: boolean }>(`/watched/check/${movieId}`),
  addMovie: (movieId: string) => api.post("/watched", { movieId }),
  removeMovie: (movieId: string) => api.delete(`/watched/${movieId}`),
};
