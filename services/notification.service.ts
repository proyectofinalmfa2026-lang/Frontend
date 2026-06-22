import api from "@/lib/axios";

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  read: boolean;
  createdAt: string;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
}

export const notificationService = {
  getByUser: (userId: number) =>
    api.get<Notification[]>(`/notifications/user/${userId}`).then((r) => r.data),

  markAsRead: (id: string) =>
    api.patch<Notification>(`/notifications/${id}/read`).then((r) => r.data),

  delete: (id: string) =>
    api.delete(`/notifications/${id}`).then((r) => r.data),
};
