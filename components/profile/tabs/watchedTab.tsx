"use client";

import Link from "next/link";
import { useWatchedTab } from "./useWatchedTab";
import MiniWatchedCard from "./miniWatchedCard";

interface WatchedTabProps {
  userId: number;
}

export default function WatchedTab({ userId }: WatchedTabProps) {
  const { items, loading, error, isOwnProfile, canEdit } =
    useWatchedTab(userId);

  if (loading) return <Skeleton />;
  if (error)
    return <p className="text-[#C13A82] text-sm text-center py-6">{error}</p>;
  if (!items.length) return <Empty isOwnProfile={isOwnProfile} />;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[#7B7497] mb-1">
        {items.length} {items.length === 1 ? "película" : "películas"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.slice(0, 6).map((item) => (
          <MiniWatchedCard key={item.id} item={item} canEdit={canEdit} />
        ))}
      </div>

      {items.length > 6 && (
        <p className="text-[10px] text-[#3D3460] text-center">
          +{items.length - 6} más
        </p>
      )}

      {isOwnProfile && items.length > 0 && (
        <Link
          href="/watched"
          className="mt-1 block text-center text-xs text-[#7B7497] hover:text-[#8C63C9] transition-colors py-2"
        >
          Ver todas las vistas →
        </Link>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl bg-[#0E0A2B] border border-[#22194A] animate-pulse"
        />
      ))}
    </div>
  );
}

function Empty({ isOwnProfile }: { isOwnProfile: boolean }) {
  return (
    <div className="text-center py-10">
      <p className="text-[#3D3460] text-3xl mb-4">🎬</p>
      <p className="text-[#D6D0DC] text-sm font-medium">
        {isOwnProfile
          ? "No has visto películas aún"
          : "No ha visto películas aún"}
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
