import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PastPaperList } from "@/components/profile/PastPaperList";
import { ProgressTracker } from "@/components/profile/ProgressTracker";
import { PerformanceSummary } from "@/components/profile/PerformanceSummary";
import { ProgressReport } from "@/components/ProgressReport";
import studentsData from "@/data/students.json";
import marksData from "@/data/marks.json";

const LMSProfile = () => {
  const studentId = "std-001";
  const student = studentsData.find(s => s.id === studentId)!;
  const studentMarks = marksData.filter(m => m.studentId === studentId);

  const scores = studentMarks.map(m => m.score);
  const stats = {
    totalPapers: student.totalPapers,
    averageScore: student.averageScore,
    attendance: student.attendance,
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores)
  };

  const weeklyTasks = [
    { task: "Complete Chapter 5 Notes", completed: true },
    { task: "Watch Video: Chemical Reactions", completed: true },
    { task: "Submit Biology Assignment", completed: false },
    { task: "Practice Past Paper 2023", completed: false },
  ];

  const badges = ["Perfect Attendance", "Top Performer", "Fast Learner"];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">My Profile</h1>
        <p className="text-sm md:text-base text-muted-foreground">View your academic profile and achievements</p>
      </div>

      <ProfileHeader student={student} />

      <ProgressReport 
        student={{
          name: student.name,
          id: student.id,
          grade: student.grade,
          class: student.class
        }}
        marks={studentMarks}
        stats={stats}
      />

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
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
