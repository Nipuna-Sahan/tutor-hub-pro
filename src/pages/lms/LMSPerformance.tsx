import { MarksChart } from "@/components/marks/MarksChart";
import { MarksTable } from "@/components/marks/MarksTable";
import { ComparisonCard } from "@/components/marks/ComparisonCard";
import marksData from "@/data/marks.json";

const LMSPerformance = () => {
  const studentId = "std-001"; // Mock student ID
  const studentMarks = marksData.filter(m => m.studentId === studentId);
  
  const scores = studentMarks.map(m => m.score);
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Performance</h1>
        <p className="text-muted-foreground">Track your academic progress</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <ComparisonCard 
          title="Highest Score" 
          value={highestScore}
          trend="up"
          subtitle="Best performance"
        />
        <ComparisonCard 
          title="Average Score" 
          value={averageScore}
          trend="neutral"
          subtitle="Overall performance"
        />
        <ComparisonCard 
          title="Lowest Score" 
          value={lowestScore}
          trend="down"
          subtitle="Needs improvement"
        />
      </div>

      {/* Performance Chart */}
      <MarksChart 
        marks={studentMarks}
        chartType="line"
        title="Performance Trend"
      />

      {/* Marks Table */}
      <MarksTable marks={studentMarks} />
    </div>
  );
};

export default LMSPerformance;
