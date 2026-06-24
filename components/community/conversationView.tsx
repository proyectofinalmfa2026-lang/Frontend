"use client";

import { useEffect, useRef, useState } from "react";
import { communityService } from "@/services/community.service";
import { useAuthStore } from "@/store/authStore";
import { useCommunityStore } from "@/store/communityStore";
import { socket } from "@/lib/sockets";

interface Props {
  conversationId: string;
}

export default function ConversationView({ conversationId }: Props) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { messages, setMessages, addMessage } = useCommunityStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const msgs = messages[conversationId] || [];
  const prevLenRef = useRef(0);

  useEffect(() => {
    if (msgs.length > prevLenRef.current && prevLenRef.current > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevLenRef.current = msgs.length;
  }, [msgs.length]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    communityService
      .getMessages(conversationId)
      .then((data) => setMessages(conversationId, data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [conversationId, user, setMessages]);

  useEffect(() => {
    const handler = (msg: any) => {
      if (msg.conversation?.id === conversationId) {
        addMessage(conversationId, msg);
      }
    };
    socket.on("newMessage", handler);
    return () => {
      socket.off("newMessage", handler);
    };
  }, [conversationId, addMessage]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    const content = input.trim();
    setInput("");
    try {
      const msg = await communityService.sendMessage(conversationId, content);
      addMessage(conversationId, msg);
    } catch {
      // fallback — el receptor lo recibe por socket
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-125 flex-col items-center justify-center rounded-xl border border-[#2A1B38] bg-[#0D0A1A] p-8 sm:h-150">
        <div className="mb-4 text-4xl">🔒</div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          Conversación privada
        </h3>
        <p className="mb-4 text-center text-sm text-[#8B7F9D]">
          Inicia sesión para leer y enviar mensajes en esta conversación.
        </p>
        <button
            onClick={() => (window.location.href = "/Login")}
          className="rounded-lg bg-[#6A4E93] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#7D5FAA] cursor-pointer"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-125 flex-col items-center justify-center rounded-xl border border-[#2A1B38] bg-[#0D0A1A] sm:h-150">
        <div className="flex gap-1">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#6A4E93]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#6A4E93] [animation-delay:0.1s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#6A4E93] [animation-delay:0.2s]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-125 flex-col overflow-hidden rounded-xl border border-[#2A1B38] bg-[#0D0A1A] shadow-lg sm:h-150">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 sm:p-5">
        {msgs.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-sm text-[#8B7F9D]">
            <p>No hay mensajes aún. ¡Escribe el primero!</p>
          </div>
        )}
        {msgs.map((msg) => {
          const isMine = msg.sender.id === user?.id;
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-3 ${isMine ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%] sm:text-base ${
                  isMine
                    ? "rounded-br-sm bg-[#6A4E93] text-white shadow-md"
                    : "rounded-bl-sm bg-[#1F1332] text-[#D6D0DC] shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#2A1B38] bg-[#0D0A1A] p-4 sm:p-5">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            className="flex-1 rounded-xl border border-[#2A1B38] bg-[#1F1332] px-4 py-2.5 text-sm text-white placeholder-[#8B7F9D] outline-none transition focus:border-[#6A4E93]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-xl bg-[#C13A82] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#C13A82] disabled:opacity-50 cursor-pointer"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
