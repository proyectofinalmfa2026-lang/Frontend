"use client";

import { useState } from "react";
import { useWatchedToggle } from "@/hooks/useWatched";
import { useAuthStore } from "@/store/authStore";
import { showAuthRequiredToast } from "@/lib/toasts/auth";
import {
  showWatchedToast,
  showWatchedErrorToast,
} from "@/lib/toasts/actions";

interface AddToWatchedButtonProps {
  movieId: string;
  variant?: "icon" | "full";
  className?: string;
}

export default function AddToWatchedButton({
  movieId,
  variant = "full",
  className = "",
}: AddToWatchedButtonProps) {
  const { isAuthenticated } = useAuthStore();
  const { watched, toggle } = useWatchedToggle(movieId);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      showAuthRequiredToast("Necesitás una cuenta para marcar películas.");
      return;
    }

    setLoading(true);
    try {
      const prev = watched;
      await toggle();
      showWatchedToast(!prev);
    } catch {
      showWatchedErrorToast();
    } finally {
      setLoading(false);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        title={watched ? "Quitar de vistas" : "Marcar como vista"}
        className={`
          group relative flex items-center justify-center
          w-8 h-8 rounded-lg
          border transition-all duration-200 cursor-pointer
          ${
            watched
              ? "bg-emerald-500/20 border-emerald-500 text-emerald-500"
              : "bg-[#0E0A2B]/80 border-[#22194A] text-[#7B7497] hover:border-emerald-500 hover:text-emerald-500"
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
        ) : watched ? (
          /* Eye filled */
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        ) : (
          /* Eye outline */
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-xl
        border font-medium text-sm transition-all duration-200 cursor-pointer
        ${
          watched
            ? "bg-emerald-500/15 border-emerald-500 text-emerald-500 hover:bg-emerald-500/25"
            : "bg-[#0E0A2B] border-[#22194A] text-[#D6D0DC] hover:border-emerald-500 hover:text-emerald-500"
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
      ) : watched ? (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
      {loading
        ? watched
          ? "Quitando..."
          : "Agregando..."
        : watched
          ? "Vista"
          : "Marcar como vista"}
    </button>
  );
}
