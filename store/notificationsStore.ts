import { create } from "zustand";
import { io } from "socket.io-client";
import { notificationService, type Notification } from "@/services/notification.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface NotificationsStore {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: (userId: number) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  connectSocket: (userId: number) => () => void;
}

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async (userId: number) => {
    set({ loading: true });
    try {
      const notifications = await notificationService.getByUser(userId);
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      set({ notifications, unreadCount, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      set((state) => {
        const notifications = state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n,
        );
        return {
          notifications,
          unreadCount: notifications.filter((n) => !n.isRead).length,
        };
      });
    } catch {}
  },

  deleteNotification: async (id: string) => {
    try {
      await notificationService.delete(id);
      set((state) => {
        const notifications = state.notifications.filter((n) => n.id !== id);
        return {
          notifications,
          unreadCount: notifications.filter((n) => !n.isRead).length,
        };
      });
    } catch {}
  },

  connectSocket: (userId: number) => {
    const socket = io(API_URL, { transports: ["websocket", "polling"] });

    socket.on("notification", (notif: Notification) => {
      if (notif.user?.id !== userId) return;
      set((state) => ({
        notifications: [notif, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }));
    });

    return () => {
      socket.disconnect();
    };
  },
}));
