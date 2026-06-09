"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import MobileMenu from "./mobileMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const links = [
    {
      href: "/movies",
      label: "Películas",
    },
    {
      href: "/community",
      label: "Comunidad",
    },
    {
      href: "/watchlist",
      label: "Mi Lista",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#22194A] bg-[#02010F]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-bold font-serif text-[#D6D0DC]"
          >
            Cine<span className="text-[#C13A82]">Sphere</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  pathname === link.href
                    ? "text-[#8C63C9]"
                    : "text-[#7B7497] hover:text-[#D6D0DC]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* SEARCH DESKTOP */}
        <div className="hidden lg:flex flex-1 justify-center px-10">
          <input
            type="text"
            placeholder="Buscar películas, usuarios..."
            className="
              w-full
              max-w-md
              bg-[#0E0A2B]
              border
              border-[#22194A]
              rounded-xl
              px-4
              py-2
              text-sm
              text-[#D6D0DC]
              placeholder:text-[#7B7497]
              focus:outline-none
              focus:border-[#8C63C9]
              transition-colors
            "
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <Link
                href="/Login"
                className="
                  bg-[#C13A82]
                  hover:bg-[#A92F71]
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  transition-colors
                  font-medium
                "
              >
                Iniciar Sesión
              </Link>
            ) : (
              <>
                <Link
                  href={`/profile/${user.username}`}
                  className="
                    flex
                    items-center
                    gap-3
                    bg-[#0E0A2B]
                    border
                    border-[#22194A]
                    rounded-xl
                    px-3
                    py-2
                    hover:border-[#8C63C9]
                    transition-colors
                  "
                >
                  <Image
                    src="/default-avatar.png"
                    alt="Avatar"
                    width={38}
                    height={38}
                    className="rounded-full"
                  />

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
                    hover:bg-[#C13A82]
                    hover:text-white
                    px-4
                    py-2
                    rounded-lg
                    transition-colors
                    font-medium
                    cursor-pointer
                  "
                >
                  Salir
                </button>
              </>
            )}
          </div>

          {/* HAMBURGER MOBILE */}
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
        </div>
      </div>

      {/* SEARCH MOBILE */}
      <div className="lg:hidden px-4 pb-4">
        <input
          type="text"
          placeholder="Buscar películas, usuarios..."
          className="
            w-full
            bg-[#0E0A2B]
            border
            border-[#22194A]
            rounded-xl
            px-4
            py-2
            text-sm
            text-[#D6D0DC]
            placeholder:text-[#7B7497]
            focus:outline-none
            focus:border-[#8C63C9]
          "
        />
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        links={links}
        user={user}
        logout={logout}
      />
    </header>
  );
}
