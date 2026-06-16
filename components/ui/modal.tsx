"use client";

import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-md mx-4 bg-[#0E0A2B] border border-[#22194A] rounded-xl p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}
