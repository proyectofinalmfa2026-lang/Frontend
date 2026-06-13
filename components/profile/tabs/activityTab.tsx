"use client";

import { useState, useEffect } from "react";
import { Review } from "@/types/profile.types";

import ReviewCard from "../reviewCard";

import EmptyState from "@/components/common/emptyState";
// ─── Hook ─────────────────────────────────────────────────────────────────────

function useActivity(userId: number) {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems([]);
    setLoading(false);
  }, [userId]);

  return { items, loading };
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface ActivityTabProps {
  userId: number;
}

export default function ActivityTab({ userId }: ActivityTabProps) {
  const { items, loading } = useActivity(userId);

  if (loading) return <p className="text-xs text-[#7B7497] p-4">Cargando...</p>;

  if (items.length === 0)
    return <EmptyState message="Todavía no hay actividad." />;

  return (
    <div className="flex flex-col gap-3">
      {items.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}
