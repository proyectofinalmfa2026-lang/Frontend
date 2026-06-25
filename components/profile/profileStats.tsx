"use client";
// components/profile/profileFeed.tsx
// Solo maneja los tabs e importa cada uno.
// Toda la lógica de datos vive dentro de cada tab.

import { useState } from "react";
import ActivityTab from "@/components/profile/tabs/activityTab";
import ReviewsTab from "@/components/profile/tabs/reviewsTab";
import WatchlistTab from "@/components/profile/tabs/watchlistTab";
import WatchedTab from "@/components/profile/tabs/watchedTab";
import StatsTab from "@/components/profile/tabs/statsTab";

const TABS = [
  { id: "activity", label: "Actividad" },
  { id: "reviews", label: "Reviews" },
  { id: "watchlist", label: "Watchlist" },
  { id: "watched", label: "Vistas" },
  { id: "stats", label: "Stats" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Componente principal ─────────────────────────────────────────────────────

interface ProfileFeedProps {
  userId: number;
}

export default function ProfileFeed({ userId }: ProfileFeedProps) {
  const [activeTab, setActiveTab] = useState<TabId>("activity");

  function renderContent() {
    switch (activeTab) {
      case "activity":
        return <ActivityTab userId={userId} />;
      case "reviews":
        return <ReviewsTab userId={userId} />;
      case "watchlist":
        return <WatchlistTab userId={userId} />;
      case "watched":
        return <WatchedTab userId={userId} />;
      case "stats":
        return <StatsTab userId={userId} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden flex">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 py-2.5 text-xs font-medium transition-colors
              ${i < TABS.length - 1 ? "border-r border-[#22194A]" : ""}
              ${
                activeTab === tab.id
                  ? "bg-[#02010F] text-[#C13A82]"
                  : "text-[#7B7497] hover:text-[#D6D0DC]"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {renderContent()}
    </div>
  );
}
