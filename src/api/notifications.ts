import api from "./client";
import type { Notification } from "./types";

export const notificationsApi = {
  getAll: () =>
    api.get<Notification[]>("/notifications"),

  markAsRead: (id: string) =>
    api.patch<void>(`/notifications/${id}/read`, {}),

  markAllAsRead: () =>
    api.patch<void>("/notifications/read-all", {}),

  getUnreadCount: () =>
    api.get<{ count: number }>("/notifications/unread-count"),
};
