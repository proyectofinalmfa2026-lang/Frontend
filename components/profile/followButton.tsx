"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { followService } from "@/services/follow.service";

interface FollowButtonProps {
  targetUserId: number;
  currentUserId: number;
  onFollowChange?: (following: boolean) => void;
}

export default function FollowButton({
  targetUserId,
  currentUserId,
  onFollowChange,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    followService
      .check(currentUserId, targetUserId)
      .then((following) => {
        if (active) setIsFollowing(following);
      })
      .catch(() => {
        if (active) {
          toast.error("No se pudo comprobar si sigues a este usuario.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [currentUserId, targetUserId]);

  const handleFollow = async () => {
    if (loading) return;

    const previousValue = isFollowing;
    setLoading(true);

    try {
      const result = await followService.toggle(currentUserId, targetUserId);
      setIsFollowing(result.following);

      if (result.following !== previousValue) {
        onFollowChange?.(result.following);
      }

      toast.success(result.message);
    } catch {
      toast.error("No se pudo actualizar el seguimiento. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFollow}
      disabled={loading}
      aria-pressed={isFollowing}
      className={`w-full rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        isFollowing
          ? "border-[#C13A82] bg-[#C13A82] text-white hover:bg-[#A92F70]"
          : "border-[#3D3460] bg-transparent text-[#D6D0DC] hover:border-[#C13A82] hover:text-[#C13A82]"
      }`}
    >
      {loading ? "Cargando..." : isFollowing ? "Siguiendo" : "Seguir"}
    </button>
  );
}
