"use client";
import { useAuthStore } from "@/store/authStore";
import WatchedGuest from "@/Views/watched/watchedGuest";
import WatchedView from "@/Views/watched/watchedView";

export default function WatchedPage() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <WatchedGuest />;
  }

  return <WatchedView />;
}
