"use client";

interface WatchlistFiltersProps {
  search: string;
  onSearch: (v: string) => void;
  genre: string;
  onGenre: (v: string) => void;
  sort: "newest" | "oldest" | "title" | "rating";
  onSort: (v: "newest" | "oldest" | "title" | "rating") => void;
  genres: string[];
  total: number;
  filtered: number;
}

export default function WatchlistFilters({
  search,
  onSearch,
  genre,
  onGenre,
  sort,
  onSort,
  genres,
  total,
  filtered,
}: WatchlistFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3D3460]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Buscar en tu watchlist..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="
            w-full pl-9 pr-4 py-2.5 rounded-xl
            bg-[#0E0A2B] border border-[#22194A]
            text-[#D6D0DC] placeholder-[#3D3460] text-sm
            focus:outline-none focus:border-[#8C63C9]
            transition-colors
          "
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D3460] hover:text-[#D6D0DC] transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Genre + Sort row */}
      <div className="flex gap-2 flex-wrap">
        {/* Genre filter */}
        {genres.length > 0 && (
          <select
            value={genre}
            onChange={(e) => onGenre(e.target.value)}
            className="
              flex-1 min-w-30 px-3 py-2 rounded-xl
              bg-[#0E0A2B] border border-[#22194A]
              text-sm text-[#D6D0DC]
              focus:outline-none focus:border-[#8C63C9]
              transition-colors appearance-none cursor-pointer
            "
          >
            <option value="">Todos los géneros</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        )}

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as typeof sort)}
          className="
            flex-1 min-w-32.5 px-3 py-2 rounded-xl
            bg-[#0E0A2B] border border-[#22194A]
            text-sm text-[#D6D0DC]
            focus:outline-none focus:border-[#8C63C9]
            transition-colors appearance-none cursor-pointer
          "
        >
          <option value="newest">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="title">Título A–Z</option>
          <option value="rating">Mejor valoradas</option>
        </select>
      </div>

      {/* Count */}
      {(search || genre) && (
        <p className="text-xs text-[#7B7497]">
          {filtered} de {total} películas
        </p>
      )}
    </div>
  );
}
