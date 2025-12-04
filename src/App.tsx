import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Resources from "./pages/Resources";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";
import StudyPacks from "./pages/StudyPacks";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminResources from "./pages/admin/AdminResources";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminPapers from "./pages/admin/AdminPapers";
import AdminMarks from "./pages/admin/AdminMarks";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminVideos from "./pages/admin/AdminVideos";

// LMS Pages
import LMSLayout from "./pages/lms/LMSLayout";
import LMSDashboard from "./pages/lms/LMSDashboard";
import LMSVideos from "./pages/lms/LMSVideos";
import LMSResources from "./pages/lms/LMSResources";
import LMSQuizzes from "./pages/lms/LMSQuizzes";
import LMSAttendance from "./pages/lms/LMSAttendance";
import LMSAssignments from "./pages/lms/LMSAssignments";
import LMSAnnouncements from "./pages/lms/LMSAnnouncements";
import LMSPerformance from "./pages/lms/LMSPerformance";
import LMSProfile from "./pages/lms/LMSProfile";
import LMSMessages from "./pages/lms/LMSMessages";
import LMSLeaderboard from "./pages/lms/LMSLeaderboard";
import AdminMessages from "./pages/admin/AdminMessages";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/:classId" element={<ClassDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/study-packs" element={<StudyPacks />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="classes" element={<AdminClasses />} />
                <Route path="resources" element={<AdminResources />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
                <Route path="papers" element={<AdminPapers />} />
                <Route path="marks" element={<AdminMarks />} />
                <Route path="attendance" element={<AdminAttendance />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="videos" element={<AdminVideos />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>
              
              {/* LMS Routes */}
              <Route path="/lms" element={<LMSLayout />}>
                <Route index element={<LMSDashboard />} />
                <Route path="videos" element={<LMSVideos />} />
                <Route path="resources" element={<LMSResources />} />
                <Route path="quizzes" element={<LMSQuizzes />} />
                <Route path="attendance" element={<LMSAttendance />} />
                <Route path="assignments" element={<LMSAssignments />} />
                <Route path="announcements" element={<LMSAnnouncements />} />
                <Route path="performance" element={<LMSPerformance />} />
                <Route path="profile" element={<LMSProfile />} />
                <Route path="messages" element={<LMSMessages />} />
                <Route path="leaderboard" element={<LMSLeaderboard />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
