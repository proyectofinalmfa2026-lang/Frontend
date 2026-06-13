"use client";
// components/profile/tabs/statsTab.tsx

import { useState, useEffect } from "react";

// ─── Type ─────────────────────────────────────────────────────────────────────

interface UserStatsDetail {
  totalMovies: number;
  totalReviews: number;
  avgScore: number;
  favoriteGenre: string;
  moviesThisMonth: number;
  scoreDistribution: { label: string; count: number }[];
  topGenres: { genre: string; count: number }[];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useStats(userId: number) {
  const [stats, setStats] = useState<UserStatsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(null);
    setLoading(false);
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

  // Calculamos el máximo para la barra de distribución
  const maxCount = Math.max(...stats.scoreDistribution.map((s) => s.count));
  const maxGenre = Math.max(...stats.topGenres.map((g) => g.count));

  return (
    <div className="flex flex-col gap-3">
      {/* Resumen general */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Películas vistas", value: stats.totalMovies },
          { label: "Reviews escritas", value: stats.totalReviews },
          { label: "Score promedio", value: `${stats.avgScore} ★` },
          { label: "Este mes", value: stats.moviesThisMonth },
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

      {/* Distribución de scores */}
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
                  style={{ width: `${(s.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#7B7497] w-6">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Géneros más vistos */}
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
                  style={{ width: `${(g.count / maxGenre) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#7B7497] w-6">{g.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
