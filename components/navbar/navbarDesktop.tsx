"use client";

import Link from "next/link";
import Image from "next/image";
import { showLogoutToast } from "@/lib/authToasts";
import NavbarNotifications from "./navbarNotifications";

interface Props {
  user: any;
  logout: () => void;
}

export default function NavbarDesktop({ user, logout }: Props) {
  return (
    <div className="hidden md:flex items-center gap-3">
      <NavbarNotifications
        isAuthenticated={!!user}
        notificationsCount={3}
        /*TODO: COnectar notis y cambiar por: notificationsCount={notifications.length} */
      />
      {!user ? (
        <Link
          href="/Login"
          className="bg-[#C13A82] hover:bg-[#A92F71] text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Iniciar Sesión
        </Link>
      ) : (
        <>
          <Link
            href={`/profile/${user.username}`}
            className="flex items-center gap-3 bg-[#0E0A2B] border border-[#22194A] rounded-xl px-3 py-2 hover:border-[#8C63C9] transition-colors"
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
            onClick={() => {
              logout();
              showLogoutToast();
            }}
            className="border border-[#C13A82] text-[#C13A82] hover:bg-[#C13A82] hover:text-white px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
          >
            Salir
          </button>
        </>
      )}
    </div>
  );
}
