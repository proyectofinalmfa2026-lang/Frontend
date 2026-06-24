"use client";

import { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";
import { Movie } from "@/types/movie.types";
import Link from "next/link";

export default function MoviesTable() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movieService
      .getAll()
      .then((data) => setMovies(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-xs text-[#7B7497]">Cargando películas...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-[#D6D0DC]">Películas</h1>
        <span className="text-xs text-[#7B7497]">{movies.length} películas</span>
      </div>

      {movies.length === 0 ? (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 text-center">
          <p className="text-sm text-[#7B7497]">No hay películas registradas</p>
        </div>
      ) : (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#22194A] text-[#7B7497] text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-medium">Película</th>
                  <th className="text-center px-4 py-3 font-medium hidden sm:table-cell">Año</th>
                  <th className="text-center px-4 py-3 font-medium hidden md:table-cell">Rating</th>
                  <th className="text-right px-4 py-3 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((m) => (
                  <tr key={m.id} className="border-b border-[#22194A] last:border-b-0 hover:bg-[#22194A]/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-10 bg-[#02010F] border border-[#22194A] rounded shrink-0 overflow-hidden">
                          {m.poster ? (
                            <img src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-[#5C5470]">🎬</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#D6D0DC] truncate">{m.title}</p>
                          {m.genre && <p className="text-[10px] text-[#5C5470]">{m.genre}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-[#7B7497] hidden sm:table-cell">{m.year ?? "—"}</td>
                    <td className="px-4 py-3 text-center text-xs text-[#7B7497] hidden md:table-cell">{m.rating ? `★ ${m.rating}` : "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/movies/${m.id}`}
                        className="inline-block px-2 py-1 text-[10px] text-[#7B7497] hover:text-[#D6D0DC] hover:bg-[#22194A]/50 rounded transition-colors"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
