"use client";

interface Props {
  isAuthenticated: boolean;
  notificationsCount?: number;
}

export default function NavbarNotifications({
  isAuthenticated,
  notificationsCount = 0,
}: Props) {
  return (
    <div className="relative group hidden md:block">
      <button
        className="
          relative
          text-[#7B7497]
          hover:text-[#D6D0DC]
          transition-colors
          cursor-pointer
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>

        {isAuthenticated && notificationsCount > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              w-4
              h-4
              bg-[#C13A82]
              rounded-full
              text-[10px]
              text-white
              flex
              items-center
              justify-center
              font-medium
            "
          >
            {notificationsCount}
          </span>
        )}
      </button>

      {!isAuthenticated && (
        <div
          className="
            absolute
            top-10
            right-0
            opacity-0
            group-hover:opacity-100
            translate-y-2
            group-hover:translate-y-0
            transition-all
            duration-200
            pointer-events-none
            whitespace-nowrap
            bg-[#0E0A2B]
            border
            border-[#22194A]
            text-[#D6D0DC]
            text-xs
            px-3
            py-2
            rounded-lg
            shadow-lg
            z-50
          "
        >
          Inicia sesión para ver tus notificaciones
        </div>
      )}

      {isAuthenticated && (
        <div
          className="
            absolute
            top-10
            right-0
            w-72
            opacity-0
            invisible
            group-hover:opacity-100
            group-hover:visible
            transition-all
            duration-200
            bg-[#0E0A2B]
            border
            border-[#22194A]
            rounded-xl
            p-4
            z-50
          "
        >
          <p className="text-[#D6D0DC] text-sm font-medium">Notificaciones</p>

          <p className="text-[#7B7497] text-sm mt-2">
            No tienes notificaciones.
          </p>
        </div>
      )}
    </div>
  );
}
