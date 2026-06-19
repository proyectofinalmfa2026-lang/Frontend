import { create } from "zustand";
import { watchlistService, WatchlistItem } from "@/services/watchlist.service";

interface WatchlistStore {
  items: WatchlistItem[];
  loading: boolean;
  error: string | null;

  // Derived: set of movieIds for O(1) lookup in the add-button
  movieIds: Set<string>;

  fetch: () => Promise<void>;
  add: (movieId: string) => Promise<void>;
  remove: (movieId: string) => Promise<void>;
  clear: () => void;
}

export const useWatchlistStore = create<WatchlistStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  movieIds: new Set(),

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const res = await watchlistService.getMyWatchlist();
      const items = res.data.filter((i) => i.movie != null);
      set({
        items,
        movieIds: new Set(items.map((i) => i.movie.id)),
        loading: false,
      });
    } catch {
      set({ error: "No se pudo cargar la watchlist.", loading: false });
    }
  },

  add: async (movieId: string) => {
    // Optimistic: add movieId immediately so the button updates instantly
    set((s) => ({ movieIds: new Set([...s.movieIds, movieId]) }));
    try {
      await watchlistService.addMovie(movieId);
      // Refresh to get full item data (title, poster, etc.)
      await get().fetch();
    } catch (err: unknown) {
      // Rollback
      set((s) => {
        const next = new Set(s.movieIds);
        next.delete(movieId);
        return { movieIds: next };
      });
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "No se pudo añadir la película.";
      throw new Error(msg);
    }
  },

  remove: async (movieId: string) => {
    // Optimistic remove
    const prev = get().items;
    set((s) => {
      const next = new Set(s.movieIds);
      next.delete(movieId);
      return {
        items: s.items.filter((i) => i.movie.id !== movieId),
        movieIds: next,
      };
    });
    try {
      await watchlistService.removeMovie(movieId);
    } catch {
      // Rollback
      set({ items: prev, movieIds: new Set(prev.map((i) => i.movie.id)) });
      throw new Error("No se pudo eliminar la película.");
    }
  },

  clear: () =>
    set({ items: [], movieIds: new Set(), loading: false, error: null }),
}));
