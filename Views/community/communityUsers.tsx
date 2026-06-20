"use client";

import { useState } from "react";
import CommunityNav from "@/components/community/communityNav";
import UserCard from "@/components/community/userCard";
import { communityService } from "@/services/community.service";

interface UserResult {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
}

export default function CommunityUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await communityService.searchUsers(query.trim());
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          Miembros
        </h1>
        <p className="text-[#8B7F9D]">
          Busca otros cinéfilos y empieza una conversación.
        </p>
      </div>
      <CommunityNav />
      <div className="mb-6 flex flex-col gap-2 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar por nombre o usuario..."
          className="flex-1 rounded-lg border border-[#2A1B38] bg-[#1F1332] px-4 py-2.5 text-sm text-white placeholder-[#8B7F9D] outline-none transition focus:border-[#6A4E93]"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="rounded-lg bg-[#6A4E93] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#7D5FAA] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>
      <div className="space-y-3">
        {results.map((u) => (
          <UserCard
            key={u.id}
            id={u.id}
            name={u.name}
            username={u.username}
            avatar={u.avatar}
          />
        ))}
        {searched && !loading && results.length === 0 && (
          <div className="rounded-lg border border-[#2A1B38] bg-[#0D0A1A] p-6 text-center text-sm text-[#8B7F9D]">
            No se encontraron usuarios con ese nombre.
          </div>
        )}
      </div>
    </div>
  );
}
