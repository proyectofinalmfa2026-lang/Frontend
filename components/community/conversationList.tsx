"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { communityService } from "@/services/community.service";
import { useAuthStore } from "@/store/authStore";
import { useCommunityStore } from "@/store/communityStore";

export default function ConversationList() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { conversations, setConversations, setCurrentConversationId } =
    useCommunityStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    communityService
      .getConversations(user.id)
      .then((data) => {
        setConversations(data);
        if (data.length > 0) setCurrentConversationId(data[0].id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, setConversations, setCurrentConversationId]);

  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-[#2A1B38] bg-[#0D0A1A] p-8 text-center">
        <div className="mb-4 text-4xl">💬</div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          Mensajes privados
        </h3>
        <p className="mb-4 text-sm text-[#8B7F9D]">
          Inicia sesión para ver tus conversaciones y chatear con otros
          cinéfilos.
        </p>
        <button
          onClick={() => (window.location.href = "/Login")}
          className="rounded-lg bg-[#6A4E93] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#7D5FAA]"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex animate-pulse items-center gap-3 rounded-lg border border-[#2A1B38] bg-[#0D0A1A] p-4"
          >
            <div className="h-10 w-10 rounded-full bg-[#1F1332]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 rounded bg-[#1F1332]" />
              <div className="h-2 w-20 rounded bg-[#1F1332]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="rounded-xl border border-[#2A1B38] bg-[#0D0A1A] p-8 text-center">
        <div className="mb-4 text-4xl">✉️</div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          Sin conversaciones
        </h3>
        <p className="text-sm text-[#8B7F9D]">
          Busca usuarios en la sección Miembros para iniciar un chat.
        </p>
      </div>
    );
  }

  const otherUser = (conv: (typeof conversations)[0]) =>
    conv.participant1.id === user?.id ? conv.participant2 : conv.participant1;

  return (
    <div className="space-y-2">
      {conversations.map((conv) => {
        const other = otherUser(conv);
        return (
          <Link
            key={conv.id}
            href={`/community/messages/${conv.id}`}
            className="flex items-center gap-4 rounded-lg border border-[#2A1B38] bg-[#0D0A1A] p-4 transition hover:border-[#6A4E93] hover:bg-[#1F1332]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#6A4E93] to-[#4A2F6F] text-sm font-bold text-white shadow-md">
              {other.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{other.name}</p>
              <p className="truncate text-sm text-[#8B7F9D]">
                @{other.username}
              </p>
            </div>
            <svg
              className="h-5 w-5 shrink-0 text-[#8B7F9D]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        );
      })}
    </div>
  );
}
