import api from "./client";
import type { Announcement } from "./types";

export const announcementsApi = {
  getAll: (activeOnly?: boolean) => {
    const query = activeOnly ? "?active=true" : "";
    return api.get<Announcement[]>(`/announcements${query}`);
  },

  getById: (id: string) =>
    api.get<Announcement>(`/announcements/${id}`),

  create: (data: Omit<Announcement, "id">) =>
    api.post<Announcement>("/announcements", data),

  update: (id: string, data: Partial<Announcement>) =>
    api.put<Announcement>(`/announcements/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/announcements/${id}`),
};
