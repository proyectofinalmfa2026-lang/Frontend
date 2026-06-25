"use client";

import Link from "next/link";
import { Badge, ProfileUser } from "@/types/profile.types";
import FollowButton from "@/components/profile/followButton";
import { useWatchedStore } from "@/store/watchedStore";
import { useAuthStore } from "@/store/authStore";

const BADGE_COLORS: Record<Badge["color"], string> = {
  gold: "bg-[#F0A500]/15 border-[#F0A500]/40 text-[#F0A500] shadow-[0_0_10px_rgba(240,165,0,0.12)]",
  blue: "bg-[#3B82F6]/15 border-[#3B82F6]/40 text-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.12)]",
  green:
    "bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.12)]",
  purple:
    "bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.12)]",
  rose: "bg-[#E11D48]/15 border-[#E11D48]/40 text-[#E11D48] shadow-[0_0_10px_rgba(225,29,72,0.12)]",
  cyan: "bg-[#06B6D4]/15 border-[#06B6D4]/40 text-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.12)]",
};

import { useState, useEffect } from "react";

export function useProfile(username: string) {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, [username]);

  return { user, loading, error };
}

function Avatar({
  user,
  isOwnProfile,
}: {
  user: ProfileUser;
  isOwnProfile: boolean;
}) {
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "?";
  const isUrl = user.avatarUrl?.startsWith("http");

  return (
    <div className="relative w-18 h-18 shrink-0">
      {isUrl ? (
        <img
          src={user.avatarUrl!}
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-white text-2xl font-medium">
          {user.avatarUrl || initial}
        </div>
      )}
    </div>
  );
}

interface ProfileSidebarProps {
  user: ProfileUser;
  isOwnProfile: boolean;
  currentUserId?: number;
  isAdmin?: boolean;
  onFollowChange?: () => void;
  onRemoveGenre?: (genre: string) => void;
  onRemoveBadge?: (badgeId: string) => void;
}

export default function ProfileSidebar({
  user,
  isOwnProfile,
  currentUserId,
  isAdmin = false,
  onFollowChange,
  onRemoveGenre,
  onRemoveBadge,
}: ProfileSidebarProps) {
  const joinedYear = new Date(user.joinedAt).getFullYear();
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const [followingCount, setFollowingCount] = useState(user.followingCount);

  useEffect(() => {
    setFollowersCount(user.followersCount);
    setFollowingCount(user.followingCount);
  }, [user.followersCount, user.followingCount]);

  const { user: authUser } = useAuthStore();
  const watchedIds = useWatchedStore((s) => s.movieIds);
  const isOwn = authUser?.id === user.id;
  const watchedCount = isOwn ? watchedIds.size : user.stats.moviesWatched;

  const handleFollowChange = (following: boolean) => {
    if (following) {
      setFollowersCount((c) => c + 1);
      setFollowingCount((c) => c + 1);
    } else {
      setFollowersCount((c) => Math.max(0, c - 1));
      setFollowingCount((c) => Math.max(0, c - 1));
    }
    onFollowChange?.();
  };

  return (
    <aside className="flex flex-col gap-3 w-full">
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden">
        <div className="flex flex-col items-center gap-2 p-5 text-center">
          <Avatar user={user} isOwnProfile={isOwnProfile} />

          <div>
            <p className="text-base font-medium text-[#D6D0DC]">{user.name}</p>
            <p className="text-xs text-[#7B7497]">@{user.username}</p>
          </div>

          {!isOwnProfile && currentUserId && (
            <FollowButton
              targetUserId={user.id}
              currentUserId={currentUserId}
              onFollowChange={handleFollowChange}
            />
          )}

          {user.isPremium && (
            <span className="inline-flex items-center gap-1 bg-[#C13A82]/10 border border-[#C13A82]/30 rounded-full px-2.5 py-1 text-xs font-medium text-[#C13A82]">
              👑 Premium
            </span>
          )}

          {user.bio && (
            <p className="text-xs text-[#7B7497] leading-relaxed">{user.bio}</p>
          )}

          {isOwnProfile && (
            <Link
              href="/profile/edit"
              className="w-full flex items-center justify-center gap-1.5 border border-[#22194A] hover:border-[#3D3460] rounded-lg py-1.5 text-xs text-[#7B7497] hover:text-[#D6D0DC] transition-colors mt-1"
            >
              ✏️ Editar perfil
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="w-full flex items-center justify-center gap-1.5 bg-[#8C63C9]/10 border border-[#8C63C9]/30 hover:bg-[#8C63C9]/20 rounded-lg py-1.5 text-xs text-[#8C63C9] hover:text-[#9D74DA] transition-colors"
            >
              📊 Panel Admin
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="border-t border-[#22194A]">
          {[
            { label: "Películas vistas", value: watchedCount },
            { label: "Reviews escritas", value: user.stats.reviews },
            { label: "Seguidores", value: followersCount },
            { label: "Siguiendo", value: followingCount },
            { label: "Rating promedio", value: `${user.stats.avgRating} ★` },
            { label: "Miembro desde", value: joinedYear },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between px-4 py-2.5 border-b border-[#22194A] last:border-b-0"
            >
              <span className="text-xs text-[#7B7497]">{stat.label}</span>
              <span className="text-xs font-medium text-[#D6D0DC]">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
        <p className="text-[10px] font-medium text-[#7B7497] uppercase tracking-wider mb-3">
          Géneros favoritos
        </p>
        <div className="flex flex-wrap gap-1.5">
          {user.favoriteGenres.map((genre) => (
            <span
              key={genre}
              className="group inline-flex items-center gap-1 bg-[#02010F] border border-[#22194A] rounded-full px-2.5 py-1 text-xs text-[#7B7497]"
            >
              {genre}
              {isOwnProfile && onRemoveGenre && (
                <button
                  onClick={() => onRemoveGenre(genre)}
                  className="ml-0.5 text-[#5C5470] hover:text-[#C13A82] transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
            </span>
          ))}
          {isOwnProfile && (
            <Link
              href="/profile/edit"
              className="border border-dashed border-[#22194A] rounded-full px-2.5 py-1 text-xs text-[#7B7497] hover:border-[#3D3460] transition-colors"
            >
              + agregar
            </Link>
          )}
        </div>
      </div>

      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
        <p className="text-[10px] font-medium text-[#7B7497] uppercase tracking-wider mb-3">
          Badges
        </p>
        <div className="flex flex-wrap gap-1.5">
          {user.badges
            .filter(
              (b) => b.requiredTier !== "premium" || user.isPremium || isAdmin,
            )
            .map((badge) => (
              <span
                key={badge.id}
                className={`group inline-flex items-center gap-1 border rounded px-2 py-1 text-xs font-medium ${BADGE_COLORS[badge.color]}`}
              >
                {badge.icon} {badge.label}
                {isOwnProfile && onRemoveBadge && (
                  <button
                    onClick={() => onRemoveBadge(badge.id)}
                    className="ml-0.5 opacity-0 group-hover:opacity-100 text-inherit hover:brightness-150 transition-all cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </span>
            ))}
          {isOwnProfile && (
            <Link
              href="/profile/edit"
              className="border border-dashed border-[#22194A] rounded px-2 py-1 text-xs text-[#7B7497] hover:border-[#3D3460] transition-colors"
            >
              + badge
            </Link>
          )}
        </div>
        {!user.isPremium && isOwnProfile && !isAdmin && (
          <div className="mt-3 pt-3 border-t border-[#22194A]">
            <Link
              href="/premium"
              className="flex items-center gap-1.5 text-xs text-[#C13A82] hover:text-[#A92F71] transition-colors"
            >
              👑 Desbloqueá badges exclusivos con Premium
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
