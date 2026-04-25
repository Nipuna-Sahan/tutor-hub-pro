import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp, Users, Crown, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMarks, useStudents, useClasses } from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } }
};

const LMSLeaderboard = () => {
  const [testType, setTestType] = useState<string>("all");
  const [institution, setInstitution] = useState<string>("all");
  const [grade, setGrade] = useState<string>("all");

  const { data: marksData = [], isLoading: l1, error: e1 } = useMarks();
  const { data: studentsData = [], isLoading: l2, error: e2 } = useStudents();
  const { data: classesData = [], isLoading: l3, error: e3 } = useClasses();

  const testTypes = useMemo(() => [...new Set(marksData.map(m => m.type))], [marksData]);
  const institutions = useMemo(() => [...new Set(classesData.map(c => c.institution).filter(Boolean))] as string[], [classesData]);
  const grades = useMemo(() => [...new Set(studentsData.map(s => s.grade))], [studentsData]);

  const leaderboardData = useMemo(() => {
    let filteredMarks = [...marksData];
    if (testType !== "all") filteredMarks = filteredMarks.filter(m => m.type === testType);

    const studentScores: Record<string, { total: number; count: number; highest: number }> = {};
    filteredMarks.forEach(mark => {
      if (!studentScores[mark.studentId]) studentScores[mark.studentId] = { total: 0, count: 0, highest: 0 };
      studentScores[mark.studentId].total += mark.score;
      studentScores[mark.studentId].count += 1;
      studentScores[mark.studentId].highest = Math.max(studentScores[mark.studentId].highest, mark.score);
    });

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

    if (grade !== "all") leaderboard = leaderboard.filter(s => s.grade === grade);
    if (institution !== "all") leaderboard = leaderboard.filter(s => s.institution === institution);

    return leaderboard.sort((a, b) => b.average - a.average);
  }, [testType, grade, institution, marksData, studentsData, classesData]);

  if (l1 || l2 || l3) return <LoadingState message="Loading leaderboard..." />;
  if (e1 || e2 || e3) return <ErrorState message="Failed to load leaderboard data." />;

  const formatType = (type: string) => type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 md:w-6 md:h-6 text-warning" />;
    if (rank === 2) return <Medal className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />;
    if (rank === 3) return <Award className="w-5 h-5 md:w-6 md:h-6 text-warning" />;
    return <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-muted-foreground font-bold text-sm">#{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-warning/20 via-warning/10 to-transparent border-warning/30";
    if (rank === 2) return "bg-gradient-to-r from-muted/50 via-muted/30 to-transparent border-border";
    if (rank === 3) return "bg-gradient-to-r from-warning/15 via-warning/5 to-transparent border-warning/20";
    return "bg-card hover:bg-muted/50 border-border/50";
  };

  return (
    <motion.div className="space-y-4 md:space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent">
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-display">Leaderboard</h1>
            <p className="text-muted-foreground text-xs md:text-sm">Top performers ranked by average score</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 w-fit">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-xs md:text-sm font-medium">{leaderboardData.length} Students</span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3 p-4 md:p-6 md:pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <CardTitle className="text-sm md:text-base">Filters</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-medium text-muted-foreground">Test Type</label>
                <Select value={testType} onValueChange={setTestType}>
                  <SelectTrigger className="rounded-xl h-9 md:h-10 text-xs md:text-sm"><SelectValue placeholder="All Types" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {testTypes.map(type => <SelectItem key={type} value={type}>{formatType(type)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-medium text-muted-foreground">Grade</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="rounded-xl h-9 md:h-10 text-xs md:text-sm"><SelectValue placeholder="All Grades" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-medium text-muted-foreground">Institution</label>
                <Select value={institution} onValueChange={setInstitution}>
                  <SelectTrigger className="rounded-xl h-9 md:h-10 text-xs md:text-sm"><SelectValue placeholder="All Institutions" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Institutions</SelectItem>
                    {institutions.map(inst => <SelectItem key={inst} value={inst}>{inst}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top 3 Podium */}
      {leaderboardData.length >= 3 && (
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 md:gap-4">
          {/* 2nd Place */}
          <motion.div className="mt-4 md:mt-8" whileHover={{ y: -4 }}>
            <Card className="border-border bg-gradient-to-b from-muted/50 to-transparent text-center p-2.5 sm:p-3 md:p-6 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/50" />
              <Medal className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-muted-foreground mx-auto mb-1.5 md:mb-3" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 mx-auto flex items-center justify-center text-base sm:text-lg md:text-xl font-bold mb-1.5 md:mb-3">
                {leaderboardData[1]?.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-[10px] sm:text-xs md:text-base truncate px-1">{leaderboardData[1]?.name}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{leaderboardData[1]?.grade}</p>
              <div className="mt-1.5 md:mt-3 text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground">{leaderboardData[1]?.average}%</div>
            </Card>
          </motion.div>

          {/* 1st Place */}
          <motion.div whileHover={{ y: -4 }}>
            <Card className="border-warning/30 bg-gradient-to-b from-warning/10 to-transparent text-center p-3 sm:p-4 md:p-6 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-warning via-warning to-warning" />
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-warning/20 rounded-full blur-2xl" />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-warning mx-auto mb-1.5 md:mb-3" />
              </motion.div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-warning to-warning/70 mx-auto flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 md:mb-3 shadow-lg">
                {leaderboardData[0]?.name.charAt(0)}
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-lg truncate px-1">{leaderboardData[0]?.name}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{leaderboardData[0]?.grade}</p>
              <div className="mt-1.5 md:mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-warning">{leaderboardData[0]?.average}%</div>
              <Badge className="mt-1.5 md:mt-2 bg-warning/20 text-warning border-warning/30 text-[10px] md:text-xs">
                <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" /> Champion
              </Badge>
            </Card>
          </motion.div>

          {/* 3rd Place */}
          <motion.div className="mt-4 md:mt-8" whileHover={{ y: -4 }}>
            <Card className="border-warning/20 bg-gradient-to-b from-warning/5 to-transparent text-center p-2.5 sm:p-3 md:p-6 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-warning/50 to-warning/70" />
              <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-warning mx-auto mb-1.5 md:mb-3" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-warning/80 to-warning/40 mx-auto flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 md:mb-3">
                {leaderboardData[2]?.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-[10px] sm:text-xs md:text-base truncate px-1">{leaderboardData[2]?.name}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{leaderboardData[2]?.grade}</p>
              <div className="mt-1.5 md:mt-3 text-lg sm:text-xl md:text-2xl font-bold text-warning">{leaderboardData[2]?.average}%</div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Full Leaderboard */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="bg-muted/30 p-4 md:p-6">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {leaderboardData.map((student, index) => (
                <motion.div
                  key={student.studentId}
                  className={cn(
                    "flex items-center gap-2.5 md:gap-4 p-3 md:p-4 transition-all duration-300 border-l-4",
                    getRankStyle(index + 1)
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex-shrink-0 w-7 md:w-10 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs md:text-lg font-bold text-primary">{student.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs md:text-base truncate">{student.name}</h4>
                    <p className="text-[10px] md:text-sm text-muted-foreground truncate">{student.grade} • {student.class}</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{student.papersCompleted}</div>
                      <div className="text-[10px] md:text-xs">Papers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{student.highestScore}%</div>
                      <div className="text-[10px] md:text-xs">Best</div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className={cn(
                      "text-base md:text-2xl font-bold",
                      index === 0 && "text-warning",
                      index === 1 && "text-muted-foreground",
                      index === 2 && "text-warning",
                      index > 2 && "text-foreground"
                    )}>
                      {student.average}%
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">Average</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LMSLeaderboard;
