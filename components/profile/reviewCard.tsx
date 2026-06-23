import { Review } from "@/types/profile.types";
import { timeAgo } from "@/lib/timeAgo";
import LikeButton from "@/components/review/likeButton";
import CommentCount from "@/components/profile/commentCount";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 flex gap-3 hover:border-[#3D3460] transition-colors">
      <div className="w-10 h-14 bg-[#02010F] border border-[#22194A] rounded flex items-center justify-center shrink-0">
        {review.posterUrl ? (
          <img
            src={review.posterUrl}
            alt={review.movieTitle}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#3D3460]"
          >
            <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#D6D0DC]">
          {review.movieTitle}
          <span className="text-xs text-[#7B7497] font-normal ml-1.5">
            {review.movieYear}
          </span>
        </p>

        <p className="text-xs text-[#7B7497] mt-0.5 mb-2">
          {timeAgo(review.createdAt)}
        </p>

        <p className="text-sm font-medium text-[#C13A82] mb-1.5">
          ★ {review.score}
        </p>

        <p className="text-xs text-[#7B7497] leading-relaxed line-clamp-2">
          {review.text}
        </p>

        <div className="flex items-center gap-3 mt-2.5">
          <LikeButton reviewId={String(review.id)} />
          <CommentCount reviewId={review.id} />
        </div>
      </div>
    </div>
  );
}
