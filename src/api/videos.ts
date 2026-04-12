import api from "./client";
import type { Video } from "./types";

export const videosApi = {
  getAll: (subject?: string) => {
    const query = subject ? `?subject=${subject}` : "";
    return api.get<Video[]>(`/videos${query}`);
  },

  getById: (id: string) =>
    api.get<Video>(`/videos/${id}`),

  create: (data: Omit<Video, "id">) =>
    api.post<Video>("/videos", data),

  update: (id: string, data: Partial<Video>) =>
    api.put<Video>(`/videos/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/videos/${id}`),
};
