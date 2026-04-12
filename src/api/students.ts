import api from "./client";
import type { Student, PaginatedResponse } from "./types";

export const studentsApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; grade?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);
    if (params?.grade) query.set("grade", params.grade);
    return api.get<PaginatedResponse<Student>>(`/students?${query}`);
  },

  getById: (id: string) =>
    api.get<Student>(`/students/${id}`),

  create: (data: Omit<Student, "id">) =>
    api.post<Student>("/students", data),

  update: (id: string, data: Partial<Student>) =>
    api.put<Student>(`/students/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/students/${id}`),
};
