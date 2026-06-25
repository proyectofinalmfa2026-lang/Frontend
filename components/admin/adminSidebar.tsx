"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Usuarios", icon: "👥" },
  { href: "/admin/movies", label: "Películas", icon: "🎬" },
  { href: "/admin/reviews", label: "Reviews", icon: "💬" },
  { href: "/admin/comments", label: "Comentarios", icon: "🗨️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-56 shrink-0">
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden md:sticky md:top-4">
        <div className="hidden md:block p-4 border-b border-[#22194A]">
          <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
            Admin
          </p>
          <p className="text-[10px] text-[#5C5470] mt-0.5">
            Panel de control
          </p>
        </div>

        <nav className="flex md:flex-col p-1 md:p-2 gap-0.5 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 md:gap-2.5 rounded-lg px-2.5 md:px-3 py-1.5 md:py-2 text-xs md:text-sm whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? "bg-[#C13A82]/10 text-[#C13A82] font-medium"
                    : "text-[#7B7497] hover:text-[#D6D0DC] hover:bg-[#22194A]/50"
                }`}
              >
                <span className="text-sm md:text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="flex md:hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap shrink-0 text-[#5C5470] hover:text-[#7B7497] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver
          </Link>
        </nav>

        <div className="hidden md:block p-3 border-t border-[#22194A]">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#5C5470] hover:text-[#7B7497] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver al sitio
          </Link>
        </div>
      </div>
    </aside>
  );
}
