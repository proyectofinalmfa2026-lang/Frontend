"use client";

import { useState, useEffect } from "react";
import { userService } from "@/services/user.service";

interface UserStatsDetail {
  totalMovies: number;
  totalReviews: number;
  avgScore: number;
  favoriteGenre: string;
  moviesThisMonth: number;
  scoreDistribution: { label: string; count: number }[];
  topGenres: { genre: string; count: number }[];
}

function useStats(userId: number) {
  const [stats, setStats] = useState<UserStatsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userService
      .getProfileById(userId)
      .then((data) => {
        setStats({
          totalMovies: data.watchlistCount ?? 0,
          totalReviews: data.reviewsCount ?? 0,
          avgScore: data.avgRating ?? 0,
          favoriteGenre: "—",
          moviesThisMonth: 0,
          scoreDistribution: [],
          topGenres: [],
        });
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [userId]);
  return { stats, loading };
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface StatsTabProps {
  userId: number;
}

export default function StatsTab({ userId }: StatsTabProps) {
  const { stats, loading } = useStats(userId);

  if (loading) return <p className="text-xs text-[#7B7497] p-4">Cargando...</p>;
  if (!stats) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Resumen general */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Películas en watchlist", value: stats.totalMovies },
          { label: "Reviews escritas", value: stats.totalReviews },
          { label: "Score promedio", value: `${stats.avgScore} ★` },
          { label: "Este mes", value: stats.moviesThisMonth || "—" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 text-center"
          >
            <p className="text-xl font-medium text-[#D6D0DC]">{s.value}</p>
            <p className="text-xs text-[#7B7497] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {stats.scoreDistribution.length > 0 && (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
          <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-4">
            Distribución de scores
          </p>
          <div className="flex flex-col gap-2">
            {stats.scoreDistribution.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-[#7B7497] w-6 text-right">
                  {s.label}
                </span>
                <div className="flex-1 h-2 bg-[#02010F] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C13A82] rounded-full transition-all"
                    style={{
                      width: `${(s.count / Math.max(...stats.scoreDistribution.map((x) => x.count))) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-[#7B7497] w-6">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.topGenres.length > 0 && (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
          <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-4">
            Géneros más vistos
          </p>
          <div className="flex flex-col gap-2">
            {stats.topGenres.map((g) => (
              <div key={g.genre} className="flex items-center gap-3">
                <span className="text-xs text-[#7B7497] w-16 truncate">
                  {g.genre}
                </span>
                <div className="flex-1 h-2 bg-[#02010F] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8C63C9] rounded-full transition-all"
                    style={{
                      width: `${(g.count / Math.max(...stats.topGenres.map((x) => x.count))) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-[#7B7497] w-6">{g.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
