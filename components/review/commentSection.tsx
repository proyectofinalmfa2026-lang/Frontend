"use client";

import { useEffect, useState, useCallback } from "react";
import { commentService, type Comment } from "@/services/comment.service";
import { useAuthStore } from "@/store/authStore";
import { showAuthRequiredToast } from "@/lib/toasts/auth";
import { timeAgo } from "@/lib/timeAgo";
import Modal from "@/components/ui/modal";

interface Props {
  reviewId: string;
}

export default function CommentSection({ reviewId }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const all = await commentService.getAll();
      setComments(all.filter((c) => c.review.id === reviewId));
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [reviewId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    if (!isAuthenticated) {
      showAuthRequiredToast("Necesitas una cuenta para comentar.");
      return;
    }

    setSending(true);
    try {
      await commentService.create(input.trim(), reviewId, user!.id);
      setInput("");
      fetchComments();
    } catch {
      showAuthRequiredToast("No se pudo enviar el comentario.");
    } finally {
      setSending(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await commentService.remove(deleteTarget);
      setComments((prev) => prev.filter((c) => c.id !== deleteTarget));
    } catch {}
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="border-t border-[#22194A] pt-3 mt-3">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un comentario..."
            className="flex-1 bg-[#02010F] border border-[#22194A] rounded-lg px-3 py-1.5 text-xs text-[#D6D0DC] placeholder-[#5C5470] outline-none focus:border-[#8C63C9] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="px-3 py-1.5 rounded-lg bg-[#C13A82] hover:bg-[#A92F71] text-white text-xs font-medium transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            {sending ? "..." : "Enviar"}
          </button>
        </form>

        {loading ? (
          <p className="text-[10px] text-[#5C5470]">Cargando comentarios...</p>
        ) : comments.length === 0 ? (
          <p className="text-[10px] text-[#5C5470]">Sin comentarios aún.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            {comments.map((comment) => {
              const isOwner = user?.id === comment.user.id;
              return (
                <div
                  key={comment.id}
                  className="flex items-start gap-2 bg-[#02010F] border border-[#22194A] rounded-lg px-3 py-2"
                >
                  <div className="w-5 h-5 rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-white text-[9px] font-medium shrink-0">
                    {comment.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium text-[#D6D0DC]">
                        @{comment.user.username}
                      </span>
                      <span className="text-[9px] text-[#5C5470]">
                        {timeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-[#7B7497] mt-0.5">
                      {comment.content}
                    </p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => setDeleteTarget(comment.id)}
                      className="text-[#5C5470] hover:text-red-400 transition-colors cursor-pointer shrink-0"
                      title="Eliminar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-[#D6D0DC]">
            Eliminar comentario
          </h3>
          <p className="text-sm text-[#7B7497]">
            Este comentario se borrará y no podrá recuperarse.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-lg border border-[#22194A] text-[#7B7497] hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-[#C13A82] hover:bg-[#A92F71] text-white transition-colors cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
