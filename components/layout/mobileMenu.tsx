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
    <div className="md:hidden fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative flex h-full w-full flex-col overflow-y-auto bg-[#02010F] px-5 py-6 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-[#22194A] pb-4">
          <span className="text-lg font-semibold text-white">Menú</span>
          <span className="text-xs text-[#7B7497]">Desliza para navegar</span>
        </div>

        <nav className="mt-6 flex flex-col gap-4 text-base text-[#D6D0DC]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-[#1b1531] hover:text-[#c13a82]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="my-6 h-px bg-[#22194A]" />

        <div className="grid gap-3">
          {!user ? (
            <Link
              href="/Login"
              className="rounded-2xl bg-[#C13A82] px-4 py-3 text-center text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.01]"
            >
              Iniciar sesión
            </Link>
          ) : (
            <>
              <Link
                href="/profile"
                className="rounded-2xl border border-[#2f264b] bg-[#121025]/80 px-4 py-3 text-sm text-[#D6D0DC] transition-colors duration-200 hover:border-[#C13A82] hover:text-[#C13A82]"
              >
                👤 {user.name}
              </Link>
              <button
                onClick={logout}
                className="rounded-2xl border border-[#C13A82] px-4 py-3 text-sm font-semibold text-[#C13A82] transition-colors duration-200 hover:bg-[#C13A82]/10"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>

        <div className="mt-auto pt-6 text-center text-xs text-[#7B7497]">
          <p className="mb-2">Disponible solo en vista móvil.</p>
          <p>El menú se oculta en pantallas grandes (`md` en adelante).</p>
        </div>
      </div>
    </div>
  );
}
