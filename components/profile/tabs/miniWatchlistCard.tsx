"use client";

import { useState } from "react";
import Link from "next/link";
import { useWatchlistStore } from "@/store/watchlistStore";
import { WatchlistItem } from "@/services/watchlist.service";
import { toast } from "sonner";

interface MiniWatchlistCardProps {
  item: WatchlistItem;
  canEdit: boolean;
}

export default function MiniWatchlistCard({
  item,
  canEdit,
}: MiniWatchlistCardProps) {
  const { remove } = useWatchlistStore();
  const [removing, setRemoving] = useState(false);

  // El backend puede no incluir la relación movie en algunos endpoints
  if (!item?.movie) return null;

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRemoving(true);
    try {
      await remove(item.movie.id);
      toast.success("Eliminada de la watchlist");
    } catch {
      toast.error("No se pudo eliminar.");
      setRemoving(false);
    }
  };

  return (
    <Link href={`/movies/${item.movie.id}`}>
      <div
        className={`
          group flex gap-3 bg-[#0E0A2B] border border-[#22194A] rounded-xl p-3
          hover:border-[#3D3460] transition-all duration-200 cursor-pointer
          ${removing ? "opacity-40 pointer-events-none" : ""}
        `}
      >
        {/* Poster */}
        <div className="w-10 h-14 shrink-0 rounded-lg overflow-hidden bg-[#02010F] border border-[#22194A]">
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
                className="w-4 h-4 text-[#3D3460]"
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
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-sm font-medium text-[#D6D0DC] truncate group-hover:text-white transition-colors">
            {item.movie.title}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs text-[#7B7497]">{item.movie.year}</span>
            {item.movie.rating !== undefined && (
              <>
                <span className="text-[#3D3460] text-xs">·</span>
                <span className="text-xs text-[#C13A82] font-medium flex items-center gap-0.5">
                  <svg
                    className="w-2.5 h-2.5"
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
        </div>

        {/* Remove button — solo dueño del perfil */}
        {canEdit && (
          <button
            onClick={handleRemove}
            disabled={removing}
            className="
              shrink-0 self-center w-6 h-6 rounded-lg
              flex items-center justify-center
              text-[#3D3460] hover:text-[#C13A82]
              opacity-0 group-hover:opacity-100
              transition-all duration-200 cursor-pointer
              
            "
          >
            <svg
              className="w-3 h-3 "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </Link>
  );
}
