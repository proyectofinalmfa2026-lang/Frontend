"use client";

import { useMemo, useState } from "react";
import { WatchlistItem } from "@/services/watchlist.service";
import WatchlistCard from "./watchlistCard";
import WatchlistFilters from "./watchlistFilters";

interface WatchlistGridProps {
  items: WatchlistItem[];
}

export default function WatchlistGrid({ items }: WatchlistGridProps) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "title" | "rating">(
    "newest",
  );

  // Available genres from current items
  const genres = useMemo(() => {
    const set = new Set(items.map((i) => i.movie.genre).filter(Boolean));
    return [...set].sort();
  }, [items]);

  const filtered = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.movie.title.toLowerCase().includes(q));
    }

    if (genre) {
      result = result.filter((i) => i.movie.genre === genre);
    }

    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "title":
        result.sort((a, b) => a.movie.title.localeCompare(b.movie.title));
        break;
      case "rating":
        result.sort((a, b) => (b.movie.rating ?? 0) - (a.movie.rating ?? 0));
        break;
    }

    return result;
  }, [items, search, genre, sort]);

  return (
    <div className="flex flex-col gap-6">
      <WatchlistFilters
        search={search}
        onSearch={setSearch}
        genre={genre}
        onGenre={setGenre}
        sort={sort}
        onSort={setSort}
        genres={genres}
        total={items.length}
        filtered={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#3D3460] text-4xl mb-4">🎬</p>
          <p className="text-[#D6D0DC] font-medium">
            {search || genre ? "Sin resultados" : "Tu watchlist está vacía"}
          </p>
          <p className="text-[#7B7497] text-sm mt-2">
            {search || genre
              ? "Prueba con otros filtros."
              : "Explora películas y añade las que quieras ver."}
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}
          {!search && !genre && (
            <p className="text-xs text-[#7B7497]">
              {items.length}{" "}
              {items.length === 1 ? "película guardada" : "películas guardadas"}
            </p>
          )}

          {/* Grid: 1 col mobile → 2 col sm → 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <WatchlistCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
