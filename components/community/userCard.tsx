"use client";

import { communityService } from "@/services/community.service";
import { useAuthStore } from "@/store/authStore";
import { showAuthRequiredToast } from "@/lib/authToasts";
import { useState } from "react";

interface Props {
  id: number;
  name: string;
  username: string;
  avatar?: string | null;
}

export default function UserCard({ id, name, username, avatar }: Props) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!isAuthenticated) {
      showAuthRequiredToast("Necesitás una cuenta para chatear con otros usuarios.");
      return;
    }
    if (!user) return;
    setLoading(true);
    try {
      const conv = await communityService.createConversation(user.id, id);
      window.location.href = `/community/messages/${conv.id}`;
    } catch {
      setLoading(false);
    }
  };

  const isSelf = user?.id === id;

  return (
    <div className="flex items-center justify-between rounded-lg border border-[#2A1B38] bg-[#0D0A1A] p-4 transition hover:border-[#6A4E93] hover:shadow-md hover:shadow-[#6A4E93]/5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#6A4E93] to-[#4A2F6F] text-sm font-bold text-white shadow-md sm:h-14 sm:w-14 sm:text-lg">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-white">{name}</p>
          <p className="truncate text-sm text-[#8B7F9D]">@{username}</p>
        </div>
      </div>
      {!isSelf && (
        <button
          onClick={handleChat}
          disabled={loading}
          className="shrink-0 rounded-lg bg-[#6A4E93] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#7D5FAA] disabled:opacity-50"
        >
          {loading ? "Abriendo..." : "Chat"}
        </button>
      )}
    </div>
  );
}
