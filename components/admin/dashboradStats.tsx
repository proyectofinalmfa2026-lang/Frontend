"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { timeAgo } from "@/lib/timeAgo";

interface DashboardData {
  users: number;
  premiumUsers: number;
  movies: number;
  reviews: number;
  comments: number;
  likes: number;
  recentUsers: any[];
  recentReviews: any[];
}

const STAT_CARDS = [
  { key: "users", label: "Usuarios", icon: "👥", bg: "bg-[#3B82F6]/10", border: "border-[#3B82F6]/20", text: "text-[#3B82F6]" },
  { key: "movies", label: "Películas", icon: "🎬", bg: "bg-[#8C63C9]/10", border: "border-[#8C63C9]/20", text: "text-[#8C63C9]" },
  { key: "reviews", label: "Reviews", icon: "💬", bg: "bg-[#C13A82]/10", border: "border-[#C13A82]/20", text: "text-[#C13A82]" },
  { key: "premiumUsers", label: "Premium", icon: "👑", bg: "bg-[#F0A500]/10", border: "border-[#F0A500]/20", text: "text-[#F0A500]" },
];

export default function DashboardStats() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboard().then(setData).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-xs text-[#7B7497]">Cargando dashboard...</p>;
  if (!data) return <p className="text-xs text-[#C13A82]">Error al cargar dashboard</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-medium text-[#D6D0DC]">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className={`${card.bg} ${card.border} border rounded-xl p-4 flex flex-col gap-1`}
          >
            <span className="text-2xl">{card.icon}</span>
            <p className={`text-2xl font-bold ${card.text}`}>
              {(data as any)[card.key]?.toLocaleString() ?? 0}
            </p>
            <p className="text-xs text-[#7B7497]">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
          <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-3">
            Últimos usuarios
          </p>
          <div className="flex flex-col gap-2">
            {data.recentUsers?.map((u: any) => (
              <div key={u.id} className="flex items-center justify-between py-1.5 border-b border-[#22194A] last:border-b-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#22194A] flex items-center justify-center text-xs text-[#7B7497]">
                    {u.name?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <p className="text-xs text-[#D6D0DC]">@{u.username}</p>
                    <p className="text-[10px] text-[#5C5470]">{u.name}</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#5C5470]">{timeAgo(u.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4">
          <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-3">
            Últimas reviews
          </p>
          <div className="flex flex-col gap-2">
            {data.recentReviews?.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between py-1.5 border-b border-[#22194A] last:border-b-0">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[#D6D0DC] truncate">
                    {r.movie?.title ?? "—"} — ★ {r.rating}
                  </p>
                  <p className="text-[10px] text-[#5C5470]">
                    por @{r.user?.username ?? "?"} · {timeAgo(r.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
