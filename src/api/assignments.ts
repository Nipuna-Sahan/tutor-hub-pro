import api, { uploadFile } from "./client";
import type { Assignment, SubmitAssignmentRequest, ApiResponse } from "./types";

export const assignmentsApi = {
  getAll: (status?: string) => {
    const query = status ? `?status=${status}` : "";
    return api.get<Assignment[]>(`/assignments${query}`);
  },

  getById: (id: string) =>
    api.get<Assignment>(`/assignments/${id}`),

  create: (data: Omit<Assignment, "id" | "status">) =>
    api.post<Assignment>("/assignments", data),

  update: (id: string, data: Partial<Assignment>) =>
    api.put<Assignment>(`/assignments/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`/assignments/${id}`),

  submit: (assignmentId: string, file: File, notes?: string) =>
    uploadFile(`/assignments/${assignmentId}/submit`, file, notes ? { notes } : undefined),

  grade: (id: string, data: { grade: number; feedback: string }) =>
    api.post<Assignment>(`/assignments/${id}/grade`, data),
};
