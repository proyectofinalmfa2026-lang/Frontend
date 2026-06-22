"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNotificationsStore } from "@/store/notificationsStore";
import NavbarNotifications from "./navbarNotifications";

interface Props {
  user: any;
  logout: () => void;
}

export default function NavbarDesktop({ user, logout }: Props) {
  const { notifications, unreadCount, fetchNotifications, connectSocket } =
    useNotificationsStore();

  useEffect(() => {
    if (!user?.id) return;
    fetchNotifications(user.id);
    const disconnect = connectSocket(user.id);
    return () => disconnect();
  }, [user?.id, fetchNotifications, connectSocket]);

  return (
    <div className="hidden md:flex items-center gap-3">
      <NavbarNotifications
        isAuthenticated={!!user}
        notifications={notifications}
        unreadCount={unreadCount}
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
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt="Avatar"
                width={38}
                height={38}
                className="rounded-full object-cover w-9.5 h-9.5"
              />
            ) : (
              <div className="w-9.5 h-9.5 rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-white text-sm font-medium">
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
            className="border border-[#C13A82] text-[#C13A82] hover:bg-[#C13A82] hover:text-white px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
          >
            Salir
          </button>
        </>
      )}
    </div>
  );
}
