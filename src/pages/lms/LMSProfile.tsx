import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PastPaperList } from "@/components/profile/PastPaperList";
import { ProgressTracker } from "@/components/profile/ProgressTracker";
import { PerformanceSummary } from "@/components/profile/PerformanceSummary";
import studentsData from "@/data/students.json";
import marksData from "@/data/marks.json";

const LMSProfile = () => {
  const studentId = "std-001"; // Mock student ID
  const student = studentsData.find(s => s.id === studentId)!;
  const studentMarks = marksData.filter(m => m.studentId === studentId);

  const weeklyTasks = [
    { task: "Complete Chapter 5 Notes", completed: true },
    { task: "Watch Video: Chemical Reactions", completed: true },
    { task: "Submit Biology Assignment", completed: false },
    { task: "Practice Past Paper 2023", completed: false },
  ];

  const badges = ["Perfect Attendance", "Top Performer", "Fast Learner"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View your academic profile and achievements</p>
      </div>

      <ProfileHeader student={student} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PastPaperList papers={studentMarks} />
          <PerformanceSummary 
            totalPapers={student.totalPapers}
            averageScore={student.averageScore}
            badges={badges}
          />
        </div>
        
        <div>
          <ProgressTracker 
            pendingPapers={3}
            weeklyTasks={weeklyTasks}
            attendance={student.attendance}
          />
        </div>
      </div>
    </div>
  );
};

export default LMSProfile;
