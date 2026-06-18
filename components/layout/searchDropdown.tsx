"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useMovies } from "@/hooks/useMovies";
import { userService, type UserSearchResult } from "@/services/user.service";

export default function SearchDropdown({ isMobile = false }: { isMobile?: boolean }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [users, setUsers] = useState<UserSearchResult[]>([]);
  const { movies } = useMovies();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }
    userService.search(debouncedQuery).then(setUsers).catch(() => setUsers([]));
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const movieResults = (movies ?? []).filter((movie) =>
    movie.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  const showDropdown = isFocused && debouncedQuery.length > 0;
  const hasResults = movieResults.length > 0 || users.length > 0;

  const close = () => {
    setQuery("");
    setIsFocused(false);
  };

  return (
    <div ref={wrapperRef} className={`relative ${isMobile ? "w-full" : "w-full max-w-md"}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder="Buscar películas, usuarios..."
        className="w-full bg-[#0E0A2B] border border-[#22194A] rounded-xl px-4 py-2 text-sm text-[#D6D0DC] placeholder:text-[#7B7497] focus:outline-none focus:border-[#8C63C9] transition-colors"
      />
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0E0A2B] border border-[#22194A] rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {!hasResults ? (
            <p className="text-[#7B7497] text-sm px-4 py-3">No se encontraron resultados</p>
          ) : (
            <>
              {movieResults.length > 0 && (
                <div>
                  <p className="text-[#7B7497] text-xs font-semibold uppercase tracking-wider px-4 pt-3 pb-1">
                    Películas
                  </p>
                  {movieResults.slice(0, 5).map((movie) => (
                    <Link
                      key={`movie-${movie.id}`}
                      href={`/movies/${movie.id}`}
                      onClick={close}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#22194A] transition-colors"
                    >
                      {movie.poster ? (
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-9 h-13 rounded object-cover"
                        />
                      ) : (
                        <div className="w-9 h-13 rounded bg-[#22194A] flex items-center justify-center text-[#7B7497] text-xs shrink-0">
                          N/A
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-[#D6D0DC] text-sm font-medium truncate">{movie.title}</span>
                        <span className="text-[#7B7497] text-xs">
                          {movie.genre} &middot; {movie.year}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {users.length > 0 && (
                <div>
                  <p className="text-[#7B7497] text-xs font-semibold uppercase tracking-wider px-4 pt-3 pb-1 border-t border-[#22194A]/50">
                    Usuarios
                  </p>
                  {users.slice(0, 5).map((user) => (
                    <Link
                      key={`user-${user.id}`}
                      href={`/profile/${user.username}`}
                      onClick={close}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#22194A] transition-colors"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#22194A] flex items-center justify-center text-[#D6D0DC] text-sm font-medium shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-[#D6D0DC] text-sm font-medium truncate">{user.name}</span>
                        <span className="text-[#7B7497] text-xs">@{user.username}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
