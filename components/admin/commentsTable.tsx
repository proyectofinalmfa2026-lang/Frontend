"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { timeAgo } from "@/lib/timeAgo";
import { toast } from "sonner";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: { id: number; username: string } | null;
  review: { id: string; rating: number } | null;
}

export default function CommentsTable() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetch = () => {
    setLoading(true);
    adminService.getComments().then(setComments).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await adminService.deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
          <span className="text-2xl">✅</span>
          <p className="text-[#D6D0DC] font-medium text-sm">Comentario eliminado</p>
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

  if (loading) return <p className="text-xs text-[#7B7497]">Cargando comentarios...</p>;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-medium text-[#D6D0DC]">Comentarios</h1>
        <span className="text-xs text-[#7B7497]">{comments.length} comentarios</span>
      </div>

      {comments.length === 0 ? (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 text-center">
          <p className="text-sm text-[#7B7497]">No hay comentarios</p>
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="flex flex-col gap-2 md:hidden">
            {comments.map((c) => (
              <div key={c.id} className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-3">
                <p className="text-xs text-[#D6D0DC] line-clamp-3 mb-1.5">{c.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#7B7497]">@{c.user?.username ?? "?"}</span>
                    {c.review && <span className="text-[10px] text-[#C13A82]">★ {c.review.rating}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#5C5470]">{timeAgo(c.createdAt)}</span>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={deleting === c.id}
                      className="px-2 py-1 text-[10px] text-[#C13A82] hover:bg-[#C13A82]/10 rounded transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {deleting === c.id ? "..." : "🗑"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table view */}
          <div className="hidden md:block bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#22194A] text-[#7B7497] text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Comentario</th>
                    <th className="text-left px-4 py-3 font-medium">Usuario</th>
                    <th className="text-center px-4 py-3 font-medium">Review ★</th>
                    <th className="text-right px-4 py-3 font-medium">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((c) => (
                    <tr key={c.id} className="border-b border-[#22194A] last:border-b-0 hover:bg-[#22194A]/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="min-w-0 max-w-xs">
                          <p className="text-xs text-[#D6D0DC] line-clamp-2">{c.content}</p>
                          <p className="text-[10px] text-[#5C5470] mt-0.5">{timeAgo(c.createdAt)}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#7B7497]">
                        @{c.user?.username ?? "?"}
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-[#C13A82]">
                        ★ {c.review?.rating ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={deleting === c.id}
                          className="px-2 py-1 text-[10px] text-[#C13A82] hover:bg-[#C13A82]/10 rounded transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deleting === c.id ? "..." : "🗑"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
