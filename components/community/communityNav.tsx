"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/community", label: "Inicio" },
  { href: "/community/ai", label: "CineSphere AI" },
  { href: "/community/messages", label: "Mensajes" },
  { href: "/community/users", label: "Usuarios" },
];

export default function CommunityNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex flex-wrap gap-2 border-b border-[#2A1B38] pb-4">
      {links.map((link) => {
        const active =
          link.href === "/community"
            ? pathname === "/community"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium transition ${
              active
                ? "bg-[#6A4E93] text-white"
                : "text-[#8B7F9D] hover:bg-[#1F1332] hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
