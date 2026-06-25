"use client";

import { useEffect } from "react";
import { useWatchedStore } from "@/store/watchedStore";
import { useAuthStore } from "@/store/authStore";

export function useWatched() {
  const { isAuthenticated } = useAuthStore();
  const { items, loading, error, fetch, add, remove, movieIds, clear } =
    useWatchedStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetch();
    } else {
      clear();
    }
  }, [isAuthenticated, fetch, clear]);

  return { items, loading, error, add, remove, movieIds };
}

export function useWatchedToggle(movieId: string) {
  const { movieIds, add, remove } = useWatchedStore();
  const watched = movieIds.has(movieId);

  const toggle = async () => {
    if (watched) {
      await remove(movieId);
    } else {
      await add(movieId);
    }
  };

  return { watched, toggle };
}
