"use client";

import { useEffect, useState } from "react";
import { followService } from "@/services/follow.service";
import { showFollowToast, showFollowErrorToast } from "@/lib/toasts/actions";
import { showAuthRequiredToast } from "@/lib/toasts/auth";
import { useAuthStore } from "@/store/authStore";

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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
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
        // Silently handle — el estado inicial queda como "no sigue"
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
    if (!isAuthenticated) {
      showAuthRequiredToast("Necesitás una cuenta para seguir usuarios.");
      return;
    }

    const previousValue = isFollowing;
    setLoading(true);

    try {
      const result = await followService.toggle(currentUserId, targetUserId);
      setIsFollowing(result.following);

      if (result.following !== previousValue) {
        onFollowChange?.(result.following);
      }

      showFollowToast(result.following);
    } catch {
      showFollowErrorToast();
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
          ? "border-[#C13A82] bg-[#C13A82] text-white hover:bg-[#A92F70] cursor-pointer"
          : "border-[#3D3460] bg-transparent text-[#D6D0DC] hover:border-[#C13A82] hover:text-[#C13A82] "
      }`}
    >
      {loading ? "Cargando..." : isFollowing ? "Siguiendo" : "Seguir"}
    </button>
  );
}
