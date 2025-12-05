import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, FileText, CheckSquare, Award, TrendingUp, Trophy, Star, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { AchievementBadges } from "@/components/AchievementBadges";
import videosData from "@/data/videos.json";
import resourcesData from "@/data/resources.json";
import announcementsData from "@/data/announcements.json";
import marksData from "@/data/marks.json";
import studentsData from "@/data/students.json";

const LMSDashboard = () => {
  const studentId = "std-001"; // Mock student ID
  const student = studentsData.find(s => s.id === studentId);
  const studentMarks = marksData.filter(m => m.studentId === studentId);
  const avgScore = studentMarks.length > 0 
    ? Math.round(studentMarks.reduce((acc, m) => acc + m.score, 0) / studentMarks.length)
    : 0;
  
  // Check if student is in top 3
  const latestMark = studentMarks.length > 0 ? studentMarks[studentMarks.length - 1] : null;
  const isTopRanked = latestMark && latestMark.rank <= 3;

  // Achievement data
  const hasAGrade = studentMarks.some(m => m.score >= 80);
  const perfectScores = studentMarks.filter(m => m.score === 100).length;
  const attendance = student?.attendance || 0;

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background p-4 md:p-6 lg:p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-primary">Welcome back</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-1 md:mb-2">
            Hello, {student?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">Continue your learning journey and achieve greatness</p>
        </div>
      </div>

      {/* Top Rank Celebration */}
      {isTopRanked && (
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border-2 border-warning/50 bg-gradient-to-r from-warning/10 via-orange-500/10 to-warning/10 p-4 md:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15),transparent_50%)]" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center shadow-gold-glow animate-bounce-subtle shrink-0">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-xl font-bold font-display flex flex-wrap items-center gap-2">
                  🎉 Congratulations! 
                  <Badge className="bg-warning/20 text-warning border-warning/30 hover:bg-warning/30 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Rank #{latestMark.rank}
                  </Badge>
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  You ranked <span className="font-semibold text-warning">#{latestMark.rank}</span> in {latestMark.paperName}!
                </p>
              </div>
            </div>
            <Link to="/lms/performance" className="flex items-center gap-2 text-warning hover:text-warning/80 font-semibold transition-colors group text-sm md:text-base whitespace-nowrap">
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Video Lessons</CardTitle>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Video className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-2xl md:text-3xl font-bold font-display">{videosData.length}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Available to watch</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Resources</CardTitle>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-2xl md:text-3xl font-bold font-display">{resourcesData.length}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Available downloads</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Papers Done</CardTitle>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-success/10 flex items-center justify-center shrink-0">
              <CheckSquare className="h-4 w-4 md:h-5 md:w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-2xl md:text-3xl font-bold font-display">{studentMarks.length}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Completed tests</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-info/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-info" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-2xl md:text-3xl font-bold font-display">{avgScore}%</div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badges Section */}
      <Card className="border-border/50 overflow-hidden">
        <CardContent className="p-3 md:p-6">
          <AchievementBadges
            testsCompleted={studentMarks.length}
            averageScore={avgScore}
            attendance={attendance}
            hasAGrade={hasAGrade}
            perfectScores={perfectScores}
            streakDays={5} // Mock streak data
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <Link to="/lms/videos">
          <Card className="group hover-lift cursor-pointer border-border/50 h-full">
            <CardContent className="p-4 md:pt-8 md:pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="font-bold font-display text-sm md:text-lg mb-0.5 md:mb-1">Watch Videos</h3>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Latest lessons available</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/lms/resources">
          <Card className="group hover-lift cursor-pointer border-border/50 h-full">
            <CardContent className="p-4 md:pt-8 md:pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h3 className="font-bold font-display text-sm md:text-lg mb-0.5 md:mb-1">Resources</h3>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Notes and past papers</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/lms/performance" className="col-span-2 md:col-span-1">
          <Card className="group hover-lift cursor-pointer border-border/50 h-full">
            <CardContent className="p-4 md:pt-8 md:pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-success" />
                </div>
                <h3 className="font-bold font-display text-sm md:text-lg mb-0.5 md:mb-1">Performance</h3>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Track your progress</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Announcements */}
      <Card className="border-border/50">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="font-display text-base md:text-lg">Latest Announcements</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <div className="space-y-3 md:space-y-4">
            {announcementsData.slice(0, 3).map((announcement, index) => (
              <div 
                key={announcement.id} 
                className="relative pl-4 md:pl-6 pb-3 md:pb-4 last:pb-0 border-l-2 border-primary/20 hover:border-primary/50 transition-colors"
              >
                <div className="absolute left-0 top-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary -translate-x-[5px] md:-translate-x-[7px]" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <h4 className="font-semibold text-sm md:text-base">{announcement.title}</h4>
                  <Badge variant="secondary" className="text-[10px] md:text-xs w-fit">
                    {new Date(announcement.date).toLocaleDateString()}
                  </Badge>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSDashboard;
