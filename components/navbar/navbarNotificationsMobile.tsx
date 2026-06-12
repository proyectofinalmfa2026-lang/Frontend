"use client";

interface Props {
  isAuthenticated: boolean;
  notificationsCount?: number;
}

export default function NavbarNotificationsMobile({
  isAuthenticated,
  notificationsCount = 0,
}: Props) {
  return (
    <div className="relative md:hidden">
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
          width="28"
          height="28"
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
    </div>
  );
}
