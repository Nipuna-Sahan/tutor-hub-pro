import api from "./client";
import type { Mark } from "./types";

export const marksApi = {
  getAll: (studentId?: string) => {
    const query = studentId ? `?studentId=${studentId}` : "";
    return api.get<Mark[]>(`/marks${query}`);
  },

  getById: (id: string) =>
    api.get<Mark>(`/marks/${id}`),

  create: (data: Omit<Mark, "id">) =>
    api.post<Mark>("/marks", data),

  update: (id: string, data: Partial<Mark>) =>
    api.put<Mark>(`/marks/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/marks/${id}`),

  bulkImport: (marks: Omit<Mark, "id">[]) =>
    api.post<Mark[]>("/marks/bulk", { marks }),

  getLeaderboard: (paperId?: string) => {
    const query = paperId ? `?paperId=${paperId}` : "";
    return api.get<Mark[]>(`/marks/leaderboard${query}`);
  },
};
