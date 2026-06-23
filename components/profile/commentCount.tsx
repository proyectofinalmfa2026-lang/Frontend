"use client";

import { useCallback, useEffect, useState } from "react";
import { commentService } from "@/services/comment.service";

interface Props {
  reviewId: string | number;
}

export default function CommentCount({ reviewId }: Props) {
  const [count, setCount] = useState(0);

  const fetchCount = useCallback(async () => {
    try {
      const all = await commentService.getAll();
      setCount(all.filter((c) => c.review.id === String(reviewId)).length);
    } catch {
      setCount(0);
    }
  }, [reviewId]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return (
    <span className="flex items-center gap-1 text-xs text-[#7B7497]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      {count}
    </span>
  );
}
