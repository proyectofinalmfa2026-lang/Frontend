"use client";
import { useAuthStore } from "@/store/authStore";
import WatchlistGuest from "@/Views/watchlist/watchlistGuest";
import WatchlistView from "@/Views/watchlist/watchlistView";

export default function wachtlistPage() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <WatchlistGuest />;
  }

  return <WatchlistView />;
}
