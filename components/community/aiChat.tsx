"use client";

import { useState, useRef, useEffect } from "react";
import { communityService } from "@/services/community.service";
import { useAuthStore } from "@/store/authStore";
import { showAuthRequiredToast } from "@/lib/authToasts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiChat() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy CineSphere AI. Pregúntame lo que quieras sobre cine.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const requireAuth = () => {
    if (!isAuthenticated) {
      showAuthRequiredToast("Necesitás una cuenta para chatear con la IA.");
      return true;
    }
    return false;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    if (requireAuth()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await communityService.aiChat(userMsg);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, hubo un error al conectar con la IA.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto flex h-125 max-w-3xl flex-col overflow-hidden rounded-xl border border-[#2A1B38] bg-[#0D0A1A] shadow-lg sm:h-150">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#2A1B38] bg-linear-to-r from-[#1F1332] to-[#0D0A1A] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#6A4E93] to-[#4A2F6F] text-lg shadow-lg">
          🤖
        </div>
        <div>
          <h3 className="font-semibold text-white">CineSphere AI</h3>
          <p className="text-xs text-[#6A4E93]">Online • Experto en cine</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 sm:p-5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1F1332] text-sm">
                🤖
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%] sm:text-base ${
                msg.role === "user"
                  ? "rounded-br-sm bg-[#6A4E93] text-white shadow-md"
                  : "rounded-bl-sm bg-[#1F1332] text-[#D6D0DC] shadow-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-end gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1F1332] text-sm">
              🤖
            </div>
            <div className="rounded-2xl rounded-bl-sm bg-[#1F1332] px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#6A4E93]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#6A4E93] [animation-delay:0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#6A4E93] [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#2A1B38] bg-[#0D0A1A] p-4 sm:p-5">
        {isAuthenticated ? (
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregúntame sobre cine..."
              className="flex-1 rounded-xl border border-[#2A1B38] bg-[#1F1332] px-4 py-2.5 text-sm text-white placeholder-[#8B7F9D] outline-none transition focus:border-[#6A4E93]"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="rounded-xl bg-[#C13A82] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#C13A82] disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              showAuthRequiredToast(
                "Necesitás una cuenta para chatear con la IA.",
              )
            }
            className="w-full rounded-xl border border-dashed border-[#2A1B38] px-4 py-3 text-sm text-[#8B7F9D] transition hover:border-[#6A4E93] hover:text-white cursor-pointer"
          >
            Inicia sesión para chatear con CineSphere AI
          </button>
        )}
      </div>
    </div>
  );
}
