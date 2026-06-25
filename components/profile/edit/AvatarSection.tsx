"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FREE_AVATARS, PREMIUM_AVATARS } from "@/constants/avatars";

interface Props {
  selectedAvatar: string;
  isPremium: boolean;
  onSelect: (avatar: string) => void;
  onUpload?: (file: File) => Promise<void>;
}

export default function AvatarSection({
  selectedAvatar,
  isPremium,
  onSelect,
  onUpload,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;
    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const isUrl = selectedAvatar?.startsWith("http");

  return (
    <section className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
      <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-4">
        Avatar
      </p>

      {/* Foto subida */}
      {isUrl && (
        <div className="mb-5">
          <p className="text-[11px] text-[#5C5470] font-medium mb-2">
            📸 Foto actual
          </p>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedAvatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#C13A82]/50"
            />
            <button
              onClick={() => onSelect("")}
              className="text-xs text-[#C13A82] hover:text-[#A92F71] transition-colors cursor-pointer"
            >
              Quitar foto
            </button>
          </div>
        </div>
      )}

      {/* Subir foto */}
      <div className="mb-5">
        <p className="text-[11px] text-[#5C5470] font-medium mb-2">
          📤 Subir foto
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading || !onUpload}
          className="bg-[#0E0A2B] border border-[#22194A] hover:border-[#3D3460] disabled:opacity-50 text-xs text-[#D6D0DC] px-4 py-2 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {uploading ? "Subiendo..." : "Elegir archivo"}
        </button>
      </div>

      <p className="text-[11px] text-[#5C5470] font-medium mb-2">
        🙌 Avatares libres
      </p>
      <div className="flex flex-wrap gap-3 mb-5">
        {FREE_AVATARS.map((avatar) => (
          <button
            key={avatar}
            onClick={() => onSelect(avatar)}
            className={`w-14 h-14 rounded-xl border text-2xl transition-all cursor-pointer ${
              selectedAvatar === avatar
                ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.2)]"
                : "border-[#22194A] bg-[#02010F] hover:border-[#3D3460]"
            }`}
          >
            {avatar}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-[#5C5470] font-medium mb-2">
        👑 Avatares Premium
      </p>
      <div className="flex flex-wrap gap-3">
        {PREMIUM_AVATARS.map((avatar) => {
          const locked = !isPremium;
          return (
            <button
              key={avatar}
              onClick={() => isPremium && onSelect(avatar)}
              disabled={locked}
              className={`w-14 h-14 rounded-xl border text-2xl transition-all relative ${
                locked
                  ? "border-[#22194A] bg-[#02010F] opacity-60 cursor-not-allowed"
                  : selectedAvatar === avatar
                    ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.2)] cursor-pointer"
                    : "border-[#22194A] bg-[#02010F] hover:border-[#3D3460] cursor-pointer"
              }`}
            >
              {avatar}
              {locked && (
                <span className="absolute -top-1 -right-1 text-xs">🔒</span>
              )}
            </button>
          );
        })}
      </div>

      {!isPremium && (
        <div className="mt-4 pt-4 border-t border-[#22194A] text-center">
          <Link
            href="/premium"
            className="inline-flex items-center gap-1.5 text-xs text-[#C13A82] hover:text-[#A92F71] transition-colors font-medium animate-pulse"
          >
            👑 Suscribete a Premium para desbloquear avatares exclusivos
          </Link>
        </div>
      )}
    </section>
  );
}
