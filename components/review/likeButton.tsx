"use client";

import { useCallback, useEffect, useState } from "react";
import { likeService } from "@/services/like.service";
import { useAuthStore } from "@/store/authStore";
import { showAuthRequiredToast } from "@/lib/authToasts";

interface Props {
  reviewId: string;
}

export default function LikeButton({ reviewId }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [reviewLikes, userLikes] = await Promise.all([
        likeService.getReviewLikes(reviewId),
        user ? likeService.getUserLikes(user.id) : Promise.resolve([]),
      ]);
      setCount(reviewLikes.length);
      if (user) {
        setLiked(
          userLikes.some(
            (l: any) => String(l.reviewId || l.review?.id) === reviewId,
          ),
        );
      }
    } catch {
      setCount(0);
      setLiked(false);
    } finally {
      setLoading(false);
    }
  }, [reviewId, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggle = async () => {
    if (!isAuthenticated) {
      showAuthRequiredToast("Necesitás una cuenta para dar likes.");
      return;
    }

    setLoading(true);

    try {
      const res = await likeService.toggle(user!.id, reviewId);
      setLiked(res.liked);
      const reviewLikes = await likeService.getReviewLikes(reviewId).catch(() => null);
      if (reviewLikes !== null) setCount(reviewLikes.length);
    } catch {
      showAuthRequiredToast("No se pudo actualizar el like.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer disabled:opacity-50 ${
        liked ? "text-[#C13A82]" : "text-[#7B7497] hover:text-[#D6D0DC]"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1112 6.006a5 5 0 117.5 6.572" />
      </svg>
      <span>{count}</span>
    </button>
  );
}
