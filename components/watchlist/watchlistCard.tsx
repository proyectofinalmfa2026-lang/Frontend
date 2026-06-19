"use client";

import { useState } from "react";
import Link from "next/link";
import { useWatchlistStore } from "@/store/watchlistStore";
import { WatchlistItem } from "@/services/watchlist.service";
import { toast } from "sonner";

interface WatchlistCardProps {
  item: WatchlistItem;
}

export default function WatchlistCard({ item }: WatchlistCardProps) {
  const { remove } = useWatchlistStore();
  const [removing, setRemoving] = useState(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRemoving(true);
    try {
      await remove(item.movie.id);
      toast.success("Eliminada de tu watchlist");
    } catch {
      toast.error("No se pudo eliminar. Intenta de nuevo.");
      setRemoving(false);
    }
  };

  const addedDate = new Date(item.createdAt).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/movies/${item.movie.id}`}>
      <article
        className={`
          group relative flex gap-4
          bg-[#0E0A2B] border border-[#22194A] rounded-2xl p-4
          hover:border-[#3D3460] hover:shadow-[0_0_24px_rgba(193,58,130,0.08)]
          transition-all duration-300 
          ${removing ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {/* Poster */}
        <div className="w-16 h-24 shrink-0 rounded-xl overflow-hidden bg-[#02010F] border border-[#22194A]">
          {item.movie.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.movie.poster}
              alt={item.movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#3D3460]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <h3 className="text-[#D6D0DC] font-semibold text-sm leading-snug group-hover:text-white transition-colors line-clamp-2">
            {item.movie.title}
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#7B7497]">{item.movie.year}</span>

            {item.movie.genre && (
              <>
                <span className="text-[#3D3460] text-xs">·</span>
                <span className="text-xs text-[#7B7497]">
                  {item.movie.genre}
                </span>
              </>
            )}

            {item.movie.rating !== undefined && (
              <>
                <span className="text-[#3D3460] text-xs">·</span>
                <span className="flex items-center gap-1 text-xs text-[#C13A82] font-medium">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {item.movie.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>

          <p className="text-xs text-[#3D3460] mt-1">Añadida el {addedDate}</p>
        </div>

        {/* Remove button */}
        <button
          onClick={handleRemove}
          disabled={removing}
          title="Quitar de watchlist"
          className="
            shrink-0 self-center
            w-7 h-7 rounded-lg
            flex items-center justify-center
            text-[#3D3460] hover:text-[#C13A82] hover:bg-[#C13A82]/10
            border border-transparent hover:border-[#C13A82]/30
            transition-all duration-200
            opacity-0 group-hover:opacity-100 cursor-pointer
          "
        >
          {removing ? (
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
          ) : (
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          )}
        </button>
      </article>
    </Link>
  );
}
