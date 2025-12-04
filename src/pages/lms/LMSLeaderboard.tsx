import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp, Users, Crown, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import marksData from "@/data/marks.json";
import studentsData from "@/data/students.json";
import classesData from "@/data/classes.json";

const LMSLeaderboard = () => {
  const [testType, setTestType] = useState<string>("all");
  const [institution, setInstitution] = useState<string>("all");
  const [grade, setGrade] = useState<string>("all");

  // Get unique values for filters
  const testTypes = useMemo(() => {
    const types = [...new Set(marksData.map(m => m.type))];
    return types;
  }, []);

  const institutions = useMemo(() => {
    const insts = [...new Set(classesData.map(c => c.institution).filter(Boolean))];
    return insts as string[];
  }, []);

  const grades = useMemo(() => {
    const gradeList = [...new Set(studentsData.map(s => s.grade))];
    return gradeList;
  }, []);

  // Calculate leaderboard data
  const leaderboardData = useMemo(() => {
    let filteredMarks = [...marksData];

    // Filter by test type
    if (testType !== "all") {
      filteredMarks = filteredMarks.filter(m => m.type === testType);
    }

    // Group by student and calculate averages
    const studentScores: Record<string, { total: number; count: number; highest: number }> = {};
    
    filteredMarks.forEach(mark => {
      if (!studentScores[mark.studentId]) {
        studentScores[mark.studentId] = { total: 0, count: 0, highest: 0 };
      }
      studentScores[mark.studentId].total += mark.score;
      studentScores[mark.studentId].count += 1;
      studentScores[mark.studentId].highest = Math.max(studentScores[mark.studentId].highest, mark.score);
    });

    // Map to student details and filter
    let leaderboard = Object.entries(studentScores).map(([studentId, scores]) => {
      const student = studentsData.find(s => s.id === studentId);
      return {
        studentId,
        name: student?.name || "Unknown",
        grade: student?.grade || "N/A",
        class: student?.class || "N/A",
        average: Math.round(scores.total / scores.count),
        papersCompleted: scores.count,
        highestScore: scores.highest,
        institution: classesData.find(c => c.title === student?.class)?.institution || "N/A"
      };
    });

    // Apply filters
    if (grade !== "all") {
      leaderboard = leaderboard.filter(s => s.grade === grade);
    }
    if (institution !== "all") {
      leaderboard = leaderboard.filter(s => s.institution === institution);
    }

    // Sort by average score
    return leaderboard.sort((a, b) => b.average - a.average);
  }, [testType, grade, institution]);

  const formatType = (type: string) => {
    return type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">#{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-transparent border-yellow-500/30";
    if (rank === 2) return "bg-gradient-to-r from-gray-300/20 via-gray-400/10 to-transparent border-gray-400/30";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 via-orange-500/10 to-transparent border-amber-600/30";
    return "bg-card hover:bg-muted/50 border-border/50";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Leaderboard</h1>
              <p className="text-muted-foreground text-sm md:text-base">Top performers ranked by average score</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{leaderboardData.length} Students</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-base">Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Test Type</label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {testTypes.map(type => (
                    <SelectItem key={type} value={type}>{formatType(type)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Grade</label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {grades.map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Institution</label>
              <Select value={institution} onValueChange={setInstitution}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="All Institutions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Institutions</SelectItem>
                  {institutions.map(inst => (
                    <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      {leaderboardData.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {/* 2nd Place */}
          <div className="order-1 mt-4 md:mt-8">
            <Card className="border-gray-400/30 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-gray-800/50 text-center p-3 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 to-gray-400" />
              <Medal className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-2 md:mb-3" />
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mx-auto flex items-center justify-center text-lg md:text-xl font-bold mb-2 md:mb-3">
                {leaderboardData[1]?.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-xs md:text-base truncate">{leaderboardData[1]?.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{leaderboardData[1]?.grade}</p>
              <div className="mt-2 md:mt-3 text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-300">{leaderboardData[1]?.average}%</div>
            </Card>
          </div>

          {/* 1st Place */}
          <div className="order-2">
            <Card className="border-yellow-500/30 bg-gradient-to-b from-yellow-100/50 to-transparent dark:from-yellow-900/20 text-center p-4 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl" />
              <Crown className="w-10 h-10 md:w-14 md:h-14 text-yellow-500 mx-auto mb-2 md:mb-3 animate-bounce-subtle" />
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mx-auto flex items-center justify-center text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 shadow-lg shadow-yellow-500/30">
                {leaderboardData[0]?.name.charAt(0)}
              </div>
              <h3 className="font-bold text-sm md:text-lg truncate">{leaderboardData[0]?.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{leaderboardData[0]?.grade}</p>
              <div className="mt-2 md:mt-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">{leaderboardData[0]?.average}%</div>
              <Badge className="mt-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                <Sparkles className="w-3 h-3 mr-1" /> Champion
              </Badge>
            </Card>
          </div>

          {/* 3rd Place */}
          <div className="order-3 mt-4 md:mt-8">
            <Card className="border-amber-600/30 bg-gradient-to-b from-orange-100/50 to-transparent dark:from-orange-900/20 text-center p-3 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              <Award className="w-8 h-8 md:w-12 md:h-12 text-amber-600 mx-auto mb-2 md:mb-3" />
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 mx-auto flex items-center justify-center text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                {leaderboardData[2]?.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-xs md:text-base truncate">{leaderboardData[2]?.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{leaderboardData[2]?.grade}</p>
              <div className="mt-2 md:mt-3 text-xl md:text-2xl font-bold text-amber-600">{leaderboardData[2]?.average}%</div>
            </Card>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Full Rankings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {leaderboardData.map((student, index) => (
              <div
                key={student.studentId}
                className={cn(
                  "flex items-center gap-3 md:gap-4 p-3 md:p-4 transition-all duration-300 border-l-4",
                  getRankStyle(index + 1),
                  index < 3 && "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-shrink-0 w-8 md:w-10 flex justify-center">
                  {getRankIcon(index + 1)}
                </div>
                
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm md:text-lg font-bold text-primary">{student.name.charAt(0)}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm md:text-base truncate">{student.name}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{student.grade} • {student.class}</p>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{student.papersCompleted}</div>
                    <div className="text-xs">Papers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{student.highestScore}%</div>
                    <div className="text-xs">Best</div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className={cn(
                    "text-lg md:text-2xl font-bold",
                    index === 0 && "bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent",
                    index === 1 && "text-gray-500",
                    index === 2 && "text-amber-600",
                    index > 2 && "text-foreground"
                  )}>
                    {student.average}%
                  </div>
                  <div className="text-xs text-muted-foreground">Average</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSLeaderboard;
