"use client";

import { Review } from "@/types/review.types";
import { timeAgo } from "@/lib/timeAgo";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import Modal from "@/components/ui/modal";

interface ReviewCardProps {
  review: Review;
  showMovie?: boolean; // en el perfil mostramos la película, en la página de movie no
  onDelete?: (reviewId: string) => void;
}

export default function ReviewCard({
  review,
  showMovie = true,
  onDelete,
}: ReviewCardProps) {
  const { user } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isOwner = user?.id === review.user.id;

  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 flex flex-col gap-3 hover:border-[#3D3460] transition-colors">
      {/* Header — usuario + fecha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {review.user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.user.avatar}
              alt={review.user.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-white text-xs font-medium">
              {review.user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-[#D6D0DC]">
              {review.user.name}
            </p>
            <p className="text-[10px] text-[#7B7497]">
              @{review.user.username}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#C13A82]">
            ★ {review.rating}/5
          </span>
          <span className="text-xs text-[#7B7497]">
            {timeAgo(review.createdAt)}
          </span>

          {isOwner && onDelete && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-trash"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007zm-10 4a1 1 0 0 0 -1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0 -1 -1m4 0a1 1 0 0 0 -1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0 -1 -1" />
                <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Película — solo si showMovie=true */}
      {showMovie && (
        <div className="flex items-center gap-2 bg-[#02010F] border border-[#22194A] rounded-lg px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#7B7497]"
          >
            <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
          </svg>
          <span className="text-xs text-[#7B7497]">
            {review.movie.title}
            <span className="ml-1 text-[#3D3460]">{review.movie.year}</span>
          </span>
        </div>
      )}

      {/* Comentario */}
      <p className="text-sm text-[#7B7497] leading-relaxed">{review.comment}</p>

      {/*Confirmacion de Borrar Review*/}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-[#D6D0DC]">
            Eliminar reseña
          </h3>

          <p className="text-sm text-[#7B7497]">
            Esta crítica desaparecerá de la cartelera y no podrá recuperarse.
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg border border-[#22194A] text-[#7B7497] hover:text-white transition-colors cursor-pointer"
            >
              Mantener reseña
            </button>

            <button
              onClick={() => {
                onDelete?.(review.id);
                setShowDeleteModal(false);
              }}
              className="px-4 py-2 rounded-lg bg-[#C13A82] hover:bg-[#A92F71]  text-white transition-colors cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
