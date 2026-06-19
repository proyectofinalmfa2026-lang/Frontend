"use client";

import { useState } from "react";
import { useWatchlistToggle } from "@/hooks/useWatchlist";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AddToWatchlistButtonProps {
  movieId: string;
  /** "icon" = solo el icono (para cards), "full" = icono + texto (para detalle) */
  variant?: "icon" | "full";
  className?: string;
}

export default function AddToWatchlistButton({
  movieId,
  variant = "full",
  className = "",
}: AddToWatchlistButtonProps) {
  const { isAuthenticated } = useAuthStore();
  const { inWatchlist, toggle } = useWatchlistToggle(movieId);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // evita navegación si está dentro de un <Link>
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/Login");
      return;
    }

    setLoading(true);
    try {
      await toggle();
      toast.success(
        inWatchlist ? "Eliminada de tu watchlist" : "Añadida a tu watchlist",
        { duration: 2000 },
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Algo salió mal. Intenta de nuevo.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        title={inWatchlist ? "Quitar de watchlist" : "Añadir a watchlist"}
        className={`
          group relative flex items-center justify-center
          w-8 h-8 rounded-lg
          border transition-all duration-200  cursor-pointer
          ${
            inWatchlist
              ? "bg-[#C13A82]/20 border-[#C13A82] text-[#C13A82]"
              : "bg-[#0E0A2B]/80 border-[#22194A] text-[#7B7497] hover:border-[#C13A82] hover:text-[#C13A82]"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {loading ? (
          <svg
            className="w-3.5 h-3.5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        ) : inWatchlist ? (
          /* Bookmark filled */
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3h14a1 1 0 011 1v17l-7-3-7 3V4a1 1 0 011-1z" />
          </svg>
        ) : (
          /* Bookmark outline */
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 3h14a1 1 0 011 1v17l-7-3-7 3V4a1 1 0 011-1z" />
          </svg>
        )}
      </button>
    );
  }

  // variant === "full"
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-xl
        border font-medium text-sm transition-all duration-200 cursor-pointer
        ${
          inWatchlist
            ? "bg-[#C13A82]/15 border-[#C13A82] text-[#C13A82] hover:bg-[#C13A82]/25"
            : "bg-[#0E0A2B] border-[#22194A] text-[#D6D0DC] hover:border-[#C13A82] hover:text-[#C13A82]"
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      ) : inWatchlist ? (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 3h14a1 1 0 011 1v17l-7-3-7 3V4a1 1 0 011-1z" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 3h14a1 1 0 011 1v17l-7-3-7 3V4a1 1 0 011-1z" />
        </svg>
      )}
      {loading
        ? inWatchlist
          ? "Quitando..."
          : "Añadiendo..."
        : inWatchlist
          ? "En watchlist"
          : "Añadir a watchlist"}
    </button>
  );
}
