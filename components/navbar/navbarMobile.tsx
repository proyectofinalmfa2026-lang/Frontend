"use client";

import { useState } from "react";
import { useNotificationsStore } from "@/store/notificationsStore";

interface Props {
  user: any;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export default function NavbarMobile({
  user,
  isMenuOpen,
  setIsMenuOpen,
}: Props) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, deleteNotification } =
    useNotificationsStore();

  const handleNotifClick = (id: string, isRead: boolean) => {
    if (!isRead) markAsRead(id);
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return "ahora";
    if (min < 60) return `hace ${min}m`;
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return `hace ${hrs}h`;
    return `hace ${Math.floor(hrs / 24)}d`;
  };

  return (
    <>
      <div className="relative md:hidden">
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="relative text-[#7B7497] hover:text-[#D6D0DC] transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>

          {user && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C13A82] rounded-full text-[10px] text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {isNotificationsOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsNotificationsOpen(false)}
            />
            <div className="absolute right-0 top-10 w-72 bg-[#0E0A2B] border border-[#22194A] rounded-xl z-50 shadow-lg">
              <div className="p-3 border-b border-[#22194A]">
                <p className="text-[#D6D0DC] font-medium">Notificaciones</p>
              </div>

              {!user ? (
                <p className="text-[#D6D0DC] text-sm p-4">
                  Inicia sesión para ver tus notificaciones.
                </p>
              ) : notifications.length === 0 ? (
                <p className="text-[#7B7497] text-sm p-4">
                  No tienes notificaciones.
                </p>
              ) : (
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`group relative flex items-start px-3 py-2.5 border-b border-[#22194A] last:border-b-0 ${
                        !notif.isRead ? "bg-[#C13A82]/5" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleNotifClick(notif.id, notif.isRead)}
                        className="flex-1 text-left min-w-0"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[#D6D0DC] text-sm font-medium truncate">
                              {!notif.isRead && (
                                <span className="inline-block w-1.5 h-1.5 bg-[#C13A82] rounded-full mr-1.5 shrink-0" />
                              )}
                              {notif.title}
                            </p>
                            <p className="text-[#7B7497] text-xs mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                          </div>
                          <span className="text-[#5C5470] text-[10px] shrink-0 mt-0.5">
                            {timeAgo(notif.createdAt)}
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                        className="ml-2 p-1 rounded-md text-[#5C5470] hover:text-[#C13A82] hover:bg-[#C13A82]/10 opacity-0 group-hover:opacity-100 transition-all shrink-0 cursor-pointer"
                        title="Eliminar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

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
    </>
  );
}
