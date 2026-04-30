// ============ Auth ============
export interface LoginRequest {
  email: string;
  password: string;
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
  role?: "student" | "admin";
  adminSecret?: string;
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
  downloadUrl?: string;
  fileUrl?: string;
  uploadDate: string;
}

// ============ Marks ============
export interface Mark {
  id: string;
  studentId: string;
  studentName?: string;
  paperId: string;
  paperName: string;
  paperTitle?: string;
  type: string;
  score: number;
  totalMarks: number;
  rank: number;
  date: string;
}

// ============ Attendance ============
export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent";
  classId?: string;
  class?: string;
}

// ============ Announcements ============
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

// ============ Classes ============
export interface ClassTimetableSlot {
  day: string;
  time: string;
}

export interface ClassFees {
  monthly: string;
  term: string;
}

export interface Class {
  id: string;
  title: string;
  grade: string;
  institution?: string;
  description?: string;
  syllabus: string[];
  timetable: ClassTimetableSlot[];
  fees: ClassFees;
  features: string[];
}

// ============ Papers ============
export interface Paper {
  id: string;
  title: string;
  type: string;
  grade: string;
  totalMarks: number;
  duration: string;
  uploadDate?: string;
}

// ============ Videos ============
export interface Video {
  id: string;
  title: string;
  description?: string;
  subject: string;
  grade?: string;
  duration: string;
  videoUrl?: string;
  url?: string;
  thumbnailUrl?: string;
  thumbnail?: string;
  uploadDate: string;
  views?: number;
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

// ============ Tutor ============
export interface TutorAchievement {
  icon: string;
  title: string;
  description: string;
}

export interface TutorTestimonial {
  name: string;
  grade: string;
  text: string;
  rating: number;
}

export interface TutorResults {
  year: string;
  grades: { A: number; B: number; C: number };
}

export interface Tutor {
  name: string;
  title?: string;
  bio?: string;
  photo?: string;
  video?: string;
  image?: string;
  teachingStyle?: string;
  qualifications?: string[];
  experience?: string;
  achievements?: TutorAchievement[];
  results?: TutorResults;
  testimonials?: TutorTestimonial[];
  [key: string]: unknown;
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
