"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { reviewService } from "@/services/review.services";

interface ReviewFormProps {
  movieId: string;
  onSuccess: () => void; // callback para refrescar las reviews después de crear
}

export default function ReviewForm({ movieId, onSuccess }: ReviewFormProps) {
  const { user, isAuthenticated } = useAuthStore();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-6 text-center">
        <p className="text-sm text-[#7B7497]">
          Iniciá sesión para escribir una review.
        </p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Seleccioná un rating");
      return;
    }
    if (comment.trim().length < 10) {
      setError("El comentario debe tener al menos 10 caracteres");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await reviewService.create({
        rating,
        comment: comment.trim(),
        movieId,
        userId: user.id,
      });
      setRating(0);
      setComment("");
      onSuccess(); // refresca las reviews
    } catch (err) {
      setError("No se pudo publicar la review. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5 flex flex-col gap-4">
      <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
        Escribir una review
      </p>

      {/* Rating — estrellas del 1 al 5 */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-[#7B7497]">Rating</p>
        <div className="flex items-center gap-1 flex-wrap">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setRating(n)}
              className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors  ${
                rating === n
                  ? "bg-[#C13A82]/20 cursor-pointer border-[#C13A82] text-[#C13A82]"
                  : rating >= n
                    ? "bg-[#C13A82]/10 border-[#C13A82]/30 text-[#C13A82]"
                    : "border-[#22194A] cursor-pointer text-[#7B7497] hover:border-[#3D3460]"
              }`}
            >
              {n}
            </button>
          ))}
          {rating > 0 && (
            <span className="text-sm text-[#C13A82] ml-2 font-medium">
              {rating}/5
            </span>
          )}
        </div>
      </div>

      {/* Comentario */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-[#7B7497]">Comentario</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="¿Qué te pareció esta película?"
          rows={4}
          maxLength={300}
          className="w-full bg-[#02010F] border border-[#22194A] rounded-lg px-3 py-2 text-sm text-[#D6D0DC] placeholder:text-[#3D3460] focus:outline-none focus:border-[#8C63C9] resize-none transition-colors"
        />
        <p className="text-[10px] text-[#3D3460] text-right">
          {comment.length}/300
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#C13A82] hover:bg-[#A92F71] disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      >
        {loading ? "Publicando..." : "Publicar review"}
      </button>
    </div>
  );
}
