"use client";

import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  links: {
    href: string;
    label: string;
  }[];
  user: any;
  logout: () => void;
}

export default function MobileMenu({
  isOpen,
  links,
  user,
  logout,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-[#22194A] bg-[#02010F]">
      <div className="flex flex-col p-5 gap-4">
        {/* Navigation */}
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[#D6D0DC] hover:text-[#8C63C9]"
          >
            {link.label}
          </Link>
        ))}

        <div className="h-px bg-[#22194A]" />

        {!user ? (
          <>
            <Link
              href="/Login"
              className="
                bg-[#C13A82]
                text-center
                text-white
                py-3
                rounded-lg
              "
            >
              Iniciar Sesión
            </Link>
          </>
        ) : (
          <>
            <Link
              href={`/profile/${user.username}`}
              className="flex items-center gap-3 bg-[#0E0A2B] border border-[#22194A] rounded-xl px-3 py-2"
            >
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-white text-sm font-medium">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-[#D6D0DC] text-sm font-medium">
                  {user.name}
                </span>
                <span className="text-[#7B7497] text-xs">Ver perfil</span>
              </div>
            </Link>
            <button
              onClick={logout}
              className="
                border
                border-[#C13A82]
                text-[#C13A82]
                py-3
                rounded-lg
              "
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
