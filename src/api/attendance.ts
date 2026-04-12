import api from "./client";
import type { AttendanceRecord } from "./types";

export const attendanceApi = {
  getByDate: (date: string, classId?: string) => {
    const query = new URLSearchParams({ date });
    if (classId) query.set("classId", classId);
    return api.get<AttendanceRecord[]>(`/attendance?${query}`);
  },

  getByStudent: (studentId: string) =>
    api.get<AttendanceRecord[]>(`/attendance/student/${studentId}`),

  mark: (data: Omit<AttendanceRecord, "id">) =>
    api.post<AttendanceRecord>("/attendance", data),

  bulkMark: (records: Omit<AttendanceRecord, "id">[]) =>
    api.post<AttendanceRecord[]>("/attendance/bulk", { records }),

  getStats: (studentId: string) =>
    api.get<{ present: number; absent: number; total: number; percentage: number }>(
      `/attendance/stats/${studentId}`
    ),
};
