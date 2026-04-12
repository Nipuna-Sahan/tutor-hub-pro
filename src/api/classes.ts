import api from "./client";
import type { Class } from "./types";

export const classesApi = {
  getAll: () =>
    api.get<Class[]>("/classes"),

  getById: (id: string) =>
    api.get<Class>(`/classes/${id}`),

  create: (data: Omit<Class, "id">) =>
    api.post<Class>("/classes", data),

  update: (id: string, data: Partial<Class>) =>
    api.put<Class>(`/classes/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/classes/${id}`),
};
