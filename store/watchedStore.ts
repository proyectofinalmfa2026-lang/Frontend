import { create } from "zustand";
import { watchedService, WatchedItem } from "@/services/watched.service";

interface WatchedStore {
  items: WatchedItem[];
  loading: boolean;
  error: string | null;
  movieIds: Set<string>;

  fetch: () => Promise<void>;
  add: (movieId: string) => Promise<void>;
  remove: (movieId: string) => Promise<void>;
  clear: () => void;
}

export const useWatchedStore = create<WatchedStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  movieIds: new Set(),

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const res = await watchedService.getMyWatched();
      const items = res.data.filter((i) => i.movie != null);
      set({
        items,
        movieIds: new Set(items.map((i) => i.movie.id)),
        loading: false,
      });
    } catch {
      set({ error: "No se pudo cargar películas vistas.", loading: false });
    }
  },

  add: async (movieId: string) => {
    set((s) => ({ movieIds: new Set([...s.movieIds, movieId]) }));
    try {
      await watchedService.addMovie(movieId);
      await get().fetch();
    } catch (err: unknown) {
      set((s) => {
        const next = new Set(s.movieIds);
        next.delete(movieId);
        return { movieIds: next };
      });
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "No se pudo marcar como vista.";
      throw new Error(msg);
    }
  },

  remove: async (movieId: string) => {
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
      await watchedService.removeMovie(movieId);
    } catch {
      set({ items: prev, movieIds: new Set(prev.map((i) => i.movie.id)) });
      throw new Error("No se pudo eliminar película vista.");
    }
  },

  clear: () =>
    set({ items: [], movieIds: new Set(), loading: false, error: null }),
}));
