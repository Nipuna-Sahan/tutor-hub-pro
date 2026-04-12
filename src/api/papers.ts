import api from "./client";
import type { Paper } from "./types";

export const papersApi = {
  getAll: (type?: string) => {
    const query = type ? `?type=${type}` : "";
    return api.get<Paper[]>(`/papers${query}`);
  },

  getById: (id: string) =>
    api.get<Paper>(`/papers/${id}`),

  create: (data: Omit<Paper, "id">) =>
    api.post<Paper>("/papers", data),

  update: (id: string, data: Partial<Paper>) =>
    api.put<Paper>(`/papers/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/papers/${id}`),
};
