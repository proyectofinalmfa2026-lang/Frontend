"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { timeAgo } from "@/lib/timeAgo";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { id: number; username: string } | null;
  movie: { id: string; title: string } | null;
}

export default function ReportsTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetch = () => {
    setLoading(true);
    adminService.getReviews().then(setReviews).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await adminService.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
          <span className="text-2xl">✅</span>
          <p className="text-[#D6D0DC] font-medium text-sm">Review eliminada</p>
        </div>
      ), { position: "top-center", duration: 2500 });
    } catch {
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#C13A82] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(193,58,130,0.25)]">
          <span className="text-2xl">❌</span>
          <p className="text-[#D6D0DC] font-medium text-sm">Error al eliminar</p>
        </div>
      ), { position: "top-center", duration: 2500 });
    }
    setDeleting(null);
  };

  if (loading) return <p className="text-xs text-[#7B7497]">Cargando reviews...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-[#D6D0DC]">Reviews</h1>
        <span className="text-xs text-[#7B7497]">{reviews.length} reviews</span>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 text-center">
          <p className="text-sm text-[#7B7497]">No hay reviews</p>
        </div>
      ) : (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#22194A] text-[#7B7497] text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-medium">Review</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Usuario</th>
                  <th className="text-center px-4 py-3 font-medium hidden md:table-cell">★</th>
                  <th className="text-right px-4 py-3 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id} className="border-b border-[#22194A] last:border-b-0 hover:bg-[#22194A]/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="min-w-0 max-w-xs">
                        <p className="text-xs font-medium text-[#D6D0DC] truncate">{r.movie?.title ?? "—"}</p>
                        <p className="text-[10px] text-[#5C5470] mt-0.5 line-clamp-1">{r.comment || "Sin comentario"}</p>
                        <p className="text-[10px] text-[#5C5470] mt-0.5">{timeAgo(r.createdAt)}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#7B7497] hidden sm:table-cell">
                      @{r.user?.username ?? "?"}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-[#C13A82] hidden md:table-cell">
                      ★ {r.rating}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        disabled={deleting === r.id}
                        className="px-2 py-1 text-[10px] text-[#C13A82] hover:bg-[#C13A82]/10 rounded transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {deleting === r.id ? "..." : "🗑 Eliminar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
