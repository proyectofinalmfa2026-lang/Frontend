"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/movies",
      label: "Películas",
    },
    {
      href: "/series",
      label: "Series",
    },
    {
      href: "/community",
      label: "Comunidad",
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

        {/* Search */}
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

          <Link
            href="/Register"
            className="
              border
              border-[#8C63C9]
              text-[#8C63C9]
              hover:bg-[#8C63C9]
              hover:text-white
              px-4
              py-2
              rounded-lg
              transition-colors
              font-medium
            "
          >
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
}
