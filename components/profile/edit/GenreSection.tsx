"use client";

import { GENRES, MAX_FAVORITE_GENRES } from "@/constants/genres";

interface Props {
  favoriteGenres: string[];
  onToggle: (genre: string) => void;
}

export default function GenreSection({ favoriteGenres, onToggle }: Props) {
  return (
    <section className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
            Géneros favoritos
          </p>
          <p className="text-[10px] text-[#5C5470] mt-0.5">
            Elegí hasta {MAX_FAVORITE_GENRES} géneros
          </p>
        </div>
        <span className="text-xs text-[#7B7497]">
          {favoriteGenres.length}/{MAX_FAVORITE_GENRES}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {GENRES.map((genre) => {
          const selected = favoriteGenres.includes(genre);
          const atLimit =
            favoriteGenres.length >= MAX_FAVORITE_GENRES && !selected;
          return (
            <button
              key={genre}
              onClick={() => onToggle(genre)}
              disabled={atLimit}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                selected
                  ? "bg-[#C13A82]/15 border-[#C13A82] text-[#C13A82] shadow-[0_0_12px_rgba(193,58,130,0.2)]"
                  : "bg-[#02010F] border-[#22194A] text-[#7B7497] hover:border-[#3D3460] hover:text-[#D6D0DC]"
              } ${atLimit ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              {selected && <span className="mr-1.5 inline-block">✓</span>}
              {genre}
            </button>
          );
        })}
      </div>
    </section>
  );
}
