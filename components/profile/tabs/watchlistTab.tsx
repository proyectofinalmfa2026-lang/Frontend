"use client";

import Link from "next/link";
import { useWatchlistTab } from "./useWatchlistTab";
import MiniWatchlistCard from "./miniWatchlistCard";

interface WatchlistTabProps {
  userId: number;
}

export default function WatchlistTab({ userId }: WatchlistTabProps) {
  const { items, loading, error, isOwnProfile, canEdit } =
    useWatchlistTab(userId);

  if (loading) return <Skeleton />;
  if (error)
    return <p className="text-[#C13A82] text-sm text-center py-6">{error}</p>;
  if (!canEdit && !items.length) return <Private />;
  if (!items.length) return <Empty isOwnProfile={isOwnProfile} />;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[#7B7497] mb-1">
        {items.length} {items.length === 1 ? "película" : "películas"}
      </p>

      {items.map((item) => (
        <MiniWatchlistCard key={item.id} item={item} canEdit={canEdit} />
      ))}

      {isOwnProfile && (
        <Link
          href="/watchlist"
          className="mt-2 block text-center text-xs text-[#7B7497] hover:text-[#8C63C9] transition-colors py-2"
        >
          Ver watchlist completa →
        </Link>
      )}
    </div>
  );
}

// ─── UI states ────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl bg-[#0E0A2B] border border-[#22194A] animate-pulse"
        />
      ))}
    </div>
  );
}

function Private() {
  return (
    <div className="text-center py-10">
      <p className="text-[#3D3460] text-3xl mb-3">🔒</p>
      <p className="text-[#7B7497] text-sm">Esta watchlist es privada.</p>
    </div>
  );
}

function Empty({ isOwnProfile }: { isOwnProfile: boolean }) {
  return (
    <div className="text-center py-10">
      <p className="text-[#3D3460] text-3xl mb-3">🎬</p>
      <p className="text-[#D6D0DC] text-sm font-medium">
        {isOwnProfile ? "Tu watchlist está vacía" : "La watchlist está vacía"}
      </p>
      {isOwnProfile && (
        <Link
          href="/movies"
          className="mt-3 inline-block text-xs text-[#8C63C9] hover:text-[#C13A82] transition-colors"
        >
          Explorar películas →
        </Link>
      )}
    </div>
  );
}
