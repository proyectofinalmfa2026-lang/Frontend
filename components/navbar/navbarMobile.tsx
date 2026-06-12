"use client";

import { useState } from "react";

interface Props {
  user: any;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export default function NavbarMobile({
  user,
  isMenuOpen,
  setIsMenuOpen,
}: Props) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <div className="relative md:hidden">
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="relative text-[#7B7497] hover:text-[#D6D0DC] transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>

          {user && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C13A82] rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          )}
        </button>

        {isNotificationsOpen && (
          <div className="absolute right-0 top-10 w-64 bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 z-50">
            {!user ? (
              <p className="text-[#D6D0DC] text-sm">
                Inicia sesión para ver tus notificaciones.
              </p>
            ) : (
              <>
                <p className="text-[#D6D0DC] font-medium">Notificaciones</p>

                <p className="text-[#7B7497] text-sm mt-2">
                  No tienes notificaciones.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-[#D6D0DC]"
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        )}
      </button>
    </>
  );
}
