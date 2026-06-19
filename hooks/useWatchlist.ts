"use client";

import { useEffect } from "react";
import { useWatchlistStore } from "@/store/watchlistStore";
import { useAuthStore } from "@/store/authStore";

/**
 * Inicializa y expone la watchlist del usuario autenticado.
 * Llámalo una vez en el layout o en la página de watchlist.
 */
export function useWatchlist() {
  const { isAuthenticated } = useAuthStore();
  const { items, loading, error, fetch, add, remove, movieIds, clear } =
    useWatchlistStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetch();
    } else {
      clear();
    }
  }, [isAuthenticated, fetch, clear]);

  return { items, loading, error, add, remove, movieIds };
}

/**
 * Hook ligero para el botón de añadir/quitar.
 * No hace fetch — solo lee el estado ya cargado.
 */
export function useWatchlistToggle(movieId: string) {
  const { movieIds, add, remove } = useWatchlistStore();
  const inWatchlist = movieIds.has(movieId);

  const toggle = async () => {
    if (inWatchlist) {
      await remove(movieId);
    } else {
      await add(movieId);
    }
  };

  return { inWatchlist, toggle };
}
