import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  studentsApi,
  classesApi,
  marksApi,
  papersApi,
  resourcesApi,
  announcementsApi,
  attendanceApi,
  videosApi,
  messagesApi,
  assignmentsApi,
  notificationsApi,
  tutorApi,
} from "@/api";
import type {
  Student,
  Class,
  Mark,
  Paper,
  Resource,
  Announcement,
  AttendanceRecord,
  Video,
  Assignment,
  SendMessageRequest,
} from "@/api/types";

// ============ Students ============
export const useStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await studentsApi.getAll({ limit: 1000 });
      // Backend may return PaginatedResponse OR a plain array
      return Array.isArray(res) ? (res as unknown as Student[]) : res.data;
    },
  });

export const useCreateStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Student, "id">) => studentsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
};

export const useUpdateStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Student> }) =>
      studentsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
};

export const useDeleteStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => studentsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
};

// ============ Classes ============
export const useClasses = () =>
  useQuery({ queryKey: ["classes"], queryFn: () => classesApi.getAll() });

export const useClass = (id?: string) =>
  useQuery({
    queryKey: ["classes", id],
    queryFn: () => classesApi.getById(id!),
    enabled: !!id,
  });

export const useCreateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Class, "id">) => classesApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
};

export const useUpdateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Class> }) =>
      classesApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
};

export const useDeleteClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => classesApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
};

// ============ Marks ============
export const useMarks = (studentId?: string) =>
  useQuery({
    queryKey: ["marks", studentId ?? "all"],
    queryFn: () => marksApi.getAll(studentId),
  });

export const useLeaderboard = (paperId?: string) =>
  useQuery({
    queryKey: ["marks", "leaderboard", paperId ?? "all"],
    queryFn: () => marksApi.getLeaderboard(paperId),
  });

export const useCreateMark = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Mark, "id">) => marksApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marks"] }),
  });
};

export const useBulkCreateMarks = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (marks: Omit<Mark, "id">[]) => marksApi.bulkImport(marks),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marks"] }),
  });
};

export const useUpdateMark = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Mark> }) =>
      marksApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marks"] }),
  });
};

export const useDeleteMark = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => marksApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marks"] }),
  });
};

// ============ Papers ============
export const usePapers = () =>
  useQuery({ queryKey: ["papers"], queryFn: () => papersApi.getAll() });

export const useCreatePaper = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Paper, "id">) => papersApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["papers"] }),
  });
};

export const useUpdatePaper = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Paper> }) =>
      papersApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["papers"] }),
  });
};

export const useDeletePaper = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => papersApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["papers"] }),
  });
};

// ============ Resources ============
export const useResources = () =>
  useQuery({ queryKey: ["resources"], queryFn: () => resourcesApi.getAll() });

export const useCreateResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Resource, "id" | "uploadDate">) =>
      resourcesApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};

export const useUpdateResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resource> }) =>
      resourcesApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};

export const useDeleteResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resourcesApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};

// ============ Announcements ============
export const useAnnouncements = () =>
  useQuery({
    queryKey: ["announcements"],
    queryFn: () => announcementsApi.getAll(),
  });

export const useCreateAnnouncement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Announcement, "id">) =>
      announcementsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
};

export const useUpdateAnnouncement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Announcement>;
    }) => announcementsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
};

export const useDeleteAnnouncement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
};

// ============ Attendance ============
export const useAttendance = (date?: string, classId?: string) =>
  useQuery({
    queryKey: ["attendance", date, classId],
    queryFn: () => attendanceApi.getByDate(date!, classId),
    enabled: !!date,
  });

export const useStudentAttendance = (studentId?: string) =>
  useQuery({
    queryKey: ["attendance", "student", studentId],
    queryFn: () => attendanceApi.getByStudent(studentId!),
    enabled: !!studentId,
  });

export const useBulkMarkAttendance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (records: Omit<AttendanceRecord, "id">[]) =>
      attendanceApi.bulkMark(records),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attendance"] }),
  });
};

// ============ Videos ============
export const useVideos = () =>
  useQuery({ queryKey: ["videos"], queryFn: () => videosApi.getAll() });

export const useCreateVideo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Video, "id">) => videosApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
};

export const useUpdateVideo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Video> }) =>
      videosApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
};

export const useDeleteVideo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => videosApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
};

// ============ Messages ============
export const useConversations = () =>
  useQuery({
    queryKey: ["conversations"],
    queryFn: () => messagesApi.getConversations(),
  });

export const useConversation = (id?: string) =>
  useQuery({
    queryKey: ["conversations", id],
    queryFn: () => messagesApi.getConversation(id!),
    enabled: !!id,
  });

export const useSendMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SendMessageRequest) => messagesApi.sendMessage(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["conversations"] }),
  });
};

// ============ Assignments ============
export const useAssignments = () =>
  useQuery({
    queryKey: ["assignments"],
    queryFn: () => assignmentsApi.getAll(),
  });

export const useSubmitAssignment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      file,
      notes,
    }: {
      id: string;
      file: File;
      notes?: string;
    }) => assignmentsApi.submit(id, file, notes),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assignments"] }),
  });
};

// ============ Notifications ============
export const useNotificationsQuery = () =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.getAll(),
  });

export const useMarkNotificationRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
};

// ============ Tutor ============
export const useTutor = () =>
  useQuery({ queryKey: ["tutor"], queryFn: () => tutorApi.get() });
