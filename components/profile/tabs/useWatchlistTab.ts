"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useWatchlistStore } from "@/store/watchlistStore";
import { watchlistService, WatchlistItem } from "@/services/watchlist.service";

export function useWatchlistTab(userId: number) {
  const { user } = useAuthStore();
  const { items: storeItems } = useWatchlistStore();

  const isOwnProfile = user?.id === userId;
  const isAdmin = user?.role === "admin";
  const canEdit = isOwnProfile;

  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOwnProfile && storeItems.length > 0) {
      setItems(storeItems);
      setLoading(false);
      return;
    }

    if (!isOwnProfile && !isAdmin) {
      setLoading(false);
      return;
    }

    if (isOwnProfile) {
      watchlistService
        .getMyWatchlist()
        .then((res) => setItems(res.data.filter((i) => i.movie != null)))
        .catch(() => setError("No se pudo cargar la watchlist."))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId, isOwnProfile, isAdmin, storeItems]);

  // Mantiene sincronía con el store cuando es el perfil propio
  useEffect(() => {
    if (isOwnProfile) setItems(storeItems.filter((i) => i.movie != null));
  }, [storeItems, isOwnProfile]);

  return { items, loading, error, isOwnProfile, isAdmin, canEdit };
}
