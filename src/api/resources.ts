import api, { uploadFile } from "./client";
import type { Resource } from "./types";

export const resourcesApi = {
  getAll: (category?: string) => {
    const query = category ? `?category=${category}` : "";
    return api.get<Resource[]>(`/resources${query}`);
  },

  getById: (id: string) =>
    api.get<Resource>(`/resources/${id}`),

  create: (data: Omit<Resource, "id" | "uploadDate">) =>
    api.post<Resource>("/resources", data),

  update: (id: string, data: Partial<Resource>) =>
    api.put<Resource>(`/resources/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/resources/${id}`),

  upload: (file: File, metadata: { title: string; category: string; grade: string; description: string }) =>
    uploadFile("/resources/upload", file, metadata),

  getDownloadUrl: (id: string) =>
    api.get<{ url: string }>(`/resources/${id}/download`),
};
