"use client";

import Link from "next/link";
import { Badge, ProfileUser } from "@/types/profile.types";

// ─── Colores de badges ────────────────────────────────────────────────────────

const BADGE_COLORS: Record<Badge["color"], string> = {
  gold: "bg-[#F0A500]/10 border-[#F0A500]/30 text-[#F0A500]",
  blue: "bg-[#639DC9]/10 border-[#639DC9]/30 text-[#639DC9]",
  green: "bg-[#63C995]/10 border-[#63C995]/30 text-[#63C995]",
  purple: "bg-[#8C63C9]/10 border-[#8C63C9]/30 text-[#8C63C9]",
};

// ─── Mock ─────────────────────────────────────────────────────────────────────
// Se usa mientras el backend no esté listo.
// Cuando tus compañeros terminen el endpoint, borrás esto y usás useProfile().

export const MOCK_USER: ProfileUser = {
  id: 1,
  username: "ale_dev",
  name: "Ale",
  bio: "Cinéfilo de corazón. Nolan, Kubrick y café ☕",
  avatarUrl: null,
  isPremium: true,
  joinedAt: "2024-01-15",
  favoriteGenres: ["Drama", "Sci-Fi", "Thriller", "Noir"],
  badges: [
    { id: "1", label: "Top Reviewer", color: "gold", icon: "⭐" },
    { id: "2", label: "500 reviews", color: "blue", icon: "🏆" },
    { id: "3", label: "En racha", color: "green", icon: "🔥" },
  ],
  stats: {
    moviesWatched: 248,
    reviews: 84,
    lists: 12,
    avgRating: 4.1,
  },
};

// CÓMO CONECTAR:
//   1. Descomentar el import de userService
//   2. Descomentar el fetch dentro del useEffect
//   3. Borrar la línea "setUser(MOCK_USER)"
//   4. Asegurarte que el endpoint devuelva la misma forma que ProfileUser

import { useState, useEffect } from "react";

export function useProfile(username: string) {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    // ── Conectar backend ──────────────────────────────────────────────────────
    // import { userService } from "@/services/user.service";
    //
    // userService
    //   .getProfile(username)
    //   .then((data) => setUser(data))
    //   .catch(() => setError("No se pudo cargar el perfil"))
    //   .finally(() => setLoading(false));
    // ─────────────────────────────────────────────────────────────────────────

    // Mock temporal — borrar cuando conectes el backend
    setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 0);
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

  return (
    <div className="relative w-18 h-18 shrink-0">
      {user.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-white text-2xl font-medium">
          {initial}
        </div>
      )}

      {isOwnProfile && (
        <button className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface ProfileSidebarProps {
  user: ProfileUser;
  isOwnProfile: boolean;
}

export default function ProfileSidebar({
  user,
  isOwnProfile,
}: ProfileSidebarProps) {
  const joinedYear = new Date(user.joinedAt).getFullYear();

  return (
    <aside className="flex flex-col gap-3 w-full">
      {/* ── Card principal ── */}
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden">
        <div className="flex flex-col items-center gap-2 p-5 text-center">
          <Avatar user={user} isOwnProfile={isOwnProfile} />

          <div>
            <p className="text-base font-medium text-[#D6D0DC]">{user.name}</p>
            <p className="text-xs text-[#7B7497]">@{user.username}</p>
          </div>

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
        </div>

        {/* Stats */}
        <div className="border-t border-[#22194A]">
          {[
            { label: "Películas vistas", value: user.stats.moviesWatched },
            { label: "Reviews escritas", value: user.stats.reviews },
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

      {/* ── Géneros favoritos ── */}
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
        <p className="text-[10px] font-medium text-[#7B7497] uppercase tracking-wider mb-3">
          Géneros favoritos
        </p>
        <div className="flex flex-wrap gap-1.5">
          {user.favoriteGenres.map((genre) => (
            <span
              key={genre}
              className="bg-[#02010F] border border-[#22194A] rounded-full px-2.5 py-1 text-xs text-[#7B7497]"
            >
              {genre}
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

      {/* ── Badges (solo premium) ── */}
      {user.isPremium && (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
          <p className="text-[10px] font-medium text-[#7B7497] uppercase tracking-wider mb-3">
            Badges
          </p>
          <div className="flex flex-wrap gap-1.5">
            {user.badges.map((badge) => (
              <span
                key={badge.id}
                className={`inline-flex items-center gap-1 border rounded px-2 py-1 text-xs font-medium ${BADGE_COLORS[badge.color]}`}
              >
                {badge.icon} {badge.label}
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
        </div>
      )}
    </aside>
  );
}
