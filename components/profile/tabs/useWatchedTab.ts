"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useWatchedStore } from "@/store/watchedStore";
import { watchedService, WatchedItem } from "@/services/watched.service";

export function useWatchedTab(userId: number) {
  const { user } = useAuthStore();
  const { items: storeItems } = useWatchedStore();

  const isOwnProfile = user?.id === userId;
  const isAdmin = user?.role === "admin";
  const canEdit = isOwnProfile;

  const [items, setItems] = useState<WatchedItem[]>([]);
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
      watchedService
        .getMyWatched()
        .then((res) => setItems(res.data.filter((i) => i.movie != null)))
        .catch(() => setError("No se pudo cargar películas vistas."))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId, isOwnProfile, isAdmin, storeItems]);

  useEffect(() => {
    if (isOwnProfile) setItems(storeItems.filter((i) => i.movie != null));
  }, [storeItems, isOwnProfile]);

  return { items, loading, error, isOwnProfile, isAdmin, canEdit };
}
