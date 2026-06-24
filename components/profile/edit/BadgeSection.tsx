"use client";

import Link from "next/link";
import { AVAILABLE_BADGES, MAX_SELECTED_BADGES } from "@/constants/badges";

const BADGE_STYLES: Record<string, string> = {
  gold: "bg-[#F0A500]/10 border-[#F0A500]/30 text-[#F0A500] hover:bg-[#F0A500]/20",
  blue: "bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/20",
  green: "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20",
  purple: "bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/20",
  rose: "bg-[#E11D48]/10 border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48]/20",
  cyan: "bg-[#06B6D4]/10 border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4]/20",
};

function BadgeCheck() {
  return (
    <span className="ml-auto shrink-0 w-4 h-4 rounded-full bg-[#C13A82] flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
    </span>
  );
}

interface Props {
  selectedBadges: string[];
  isPremium: boolean;
  onToggle: (badgeId: string) => void;
}

export default function BadgeSection({ selectedBadges, isPremium, onToggle }: Props) {
  return (
    <section className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">Badges</p>
          <p className="text-[10px] text-[#5C5470] mt-0.5">Elegí hasta {MAX_SELECTED_BADGES} badges para mostrar</p>
        </div>
        <span className="text-xs text-[#7B7497]">{selectedBadges.length}/{MAX_SELECTED_BADGES}</span>
      </div>

      <p className="text-[11px] text-[#5C5470] font-medium mb-2">🙌 Libres</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {AVAILABLE_BADGES.filter((b) => b.requiredTier === "free").map((badge) => {
          const selected = selectedBadges.includes(badge.id);
          const atLimit = selectedBadges.length >= MAX_SELECTED_BADGES && !selected;
          return (
            <button
              key={badge.id}
              onClick={() => onToggle(badge.id)}
              disabled={atLimit}
              className={`cursor-pointer flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                selected
                  ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.15)]"
                  : BADGE_STYLES[badge.color]
              } ${atLimit ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              <span className="text-lg shrink-0">{badge.icon}</span>
              <span className="text-xs font-medium truncate">{badge.label}</span>
              {selected && <BadgeCheck />}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-[#5C5470] font-medium mb-2">👑 Premium</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {AVAILABLE_BADGES.filter((b) => b.requiredTier === "premium").map((badge) => {
          const selected = selectedBadges.includes(badge.id);
          const disabled = !isPremium || (selectedBadges.length >= MAX_SELECTED_BADGES && !selected);
          return (
            <button
              key={badge.id}
              onClick={() => isPremium && onToggle(badge.id)}
              disabled={disabled}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                !isPremium
                  ? "border-[#22194A] bg-[#02010F] text-[#5C5470] opacity-60 cursor-not-allowed"
                  : selected
                    ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.15)] cursor-pointer"
                    : `${BADGE_STYLES[badge.color]} cursor-pointer`
              } ${disabled && isPremium ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              <span className="text-lg shrink-0">{badge.icon}</span>
              <span className="text-xs font-medium truncate">{badge.label}</span>
              {!isPremium && <span className="ml-auto shrink-0 text-[10px] text-[#C13A82]">👑</span>}
              {isPremium && selected && <BadgeCheck />}
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
            👑 Suscribete a Premium para desbloquear badges exclusivos
          </Link>
        </div>
      )}
    </section>
  );
}
