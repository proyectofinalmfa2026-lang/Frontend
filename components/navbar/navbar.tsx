"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";
import { showLogoutToast } from "@/lib/authToasts";

import MobileMenu from "../layout/mobileMenu";
import SearchDropdown from "../layout/searchDropdown";
import NavbarDesktop from "./navbarDesktop";
import NavbarMobile from "./navbarMobile";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useWatchlist();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const handleLogout = useCallback(() => {
    const onProfile = pathname.startsWith("/profile/");
    logout();
    showLogoutToast();
    if (onProfile) router.push("/");
  }, [logout, pathname, router]);

  const links = [
    { href: "/movies", label: "Películas" },
    { href: "/community", label: "Comunidad" },
    { href: "/watchlist", label: "Mi Lista" },
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
          <SearchDropdown />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <NavbarDesktop user={user} logout={handleLogout} />

          <NavbarMobile
            user={user}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>

      {/* SEARCH MOBILE */}
      <div className="lg:hidden px-4 pb-4">
        <SearchDropdown isMobile />
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
