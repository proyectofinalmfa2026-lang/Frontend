"use client";

import { genres } from "@/constants/genres";

interface MovieFiltersProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
}

export default function MovieFilters({
  search,
  setSearch,
  selectedGenre,
  setSelectedGenre,
}: MovieFiltersProps) {
  return (
    <div className="mb-8">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Buscar películas..."
        className="
          w-full
          bg-[#0E0A2B]
          border
          border-[#22194A]
          rounded-xl
          px-4
          py-3
          text-[#D6D0DC]
          placeholder:text-[#7B7497]
          focus:outline-none
          focus:border-[#8C63C9]
        "
      />

      <div className="flex flex-wrap gap-3 mt-5">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`
              px-4
              py-2
              rounded-full
              border
              transition-all
              cursor-pointer
              ${
                selectedGenre === genre
                  ? "bg-[#8C63C9] border-[#8C63C9] text-white"
                  : "bg-[#0E0A2B] border-[#22194A] text-[#7B7497]"
              }
            `}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
