// ============ Auth ============
export interface LoginRequest {
  email: string;
  password: string;
  role: "student" | "admin";
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  grade?: string;
  class?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar?: string;
}

// ============ Students ============
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  class: string;
  joinedDate: string;
  attendance: number;
  totalPapers: number;
  averageScore: number;
}

// ============ Messages ============
export interface Message {
  id: string;
  sender: "student" | "teacher";
  text: string;
  timestamp: string;
  read: boolean;
  attachments?: FileAttachment[];
}

export interface Conversation {
  id: string;
  studentId: string;
  studentName: string;
  messages: Message[];
  lastMessageTime: string;
  unreadCount: number;
}

export interface SendMessageRequest {
  conversationId: string;
  text: string;
  attachments?: string[];
}

// ============ Assignments ============
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "submitted" | "overdue" | "graded";
  subject: string;
  submittedDate?: string;
  grade?: number;
  feedback?: string;
}

export interface SubmitAssignmentRequest {
  assignmentId: string;
  notes?: string;
  fileUrl: string;
}

// ============ Resources ============
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  grade: string;
  fileUrl: string;
  uploadDate: string;
}

// ============ Marks ============
export interface Mark {
  id: string;
  studentId: string;
  studentName: string;
  paperId: string;
  paperTitle: string;
  score: number;
  totalMarks: number;
  rank?: number;
  date: string;
}

// ============ Attendance ============
export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent";
  classId: string;
}

// ============ Announcements ============
export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: "normal" | "high" | "urgent";
  targetAudience: string;
  active: boolean;
}

// ============ Classes ============
export interface Class {
  id: string;
  title: string;
  grade: string;
  fees: string;
  syllabus: string;
  timetable: string;
  features: string[];
}

// ============ Papers ============
export interface Paper {
  id: string;
  title: string;
  type: string;
  subject: string;
  grade: string;
  date: string;
  totalMarks: number;
  duration: string;
}

// ============ Videos ============
export interface Video {
  id: string;
  title: string;
  subject: string;
  duration: string;
  url: string;
  thumbnail?: string;
  uploadDate: string;
}

// ============ Notifications ============
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

// ============ File ============
export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

// ============ Pagination ============
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============ API Response ============
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
