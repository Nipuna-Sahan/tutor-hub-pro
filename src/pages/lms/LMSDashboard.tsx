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
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Welcome back</span>
          </div>
          <h1 className="text-4xl font-bold font-display mb-2">
            Hello, {student?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">Continue your learning journey and achieve greatness</p>
        </div>
      </div>

      {/* Top Rank Celebration */}
      {isTopRanked && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-warning/50 bg-gradient-to-r from-warning/10 via-orange-500/10 to-warning/10 p-6 animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15),transparent_50%)]" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center shadow-gold-glow animate-bounce-subtle">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display flex items-center gap-2">
                  🎉 Congratulations! 
                  <Badge className="bg-warning/20 text-warning border-warning/30 hover:bg-warning/30">
                    <Star className="w-3 h-3 mr-1" />
                    Rank #{latestMark.rank}
                  </Badge>
                </h3>
                <p className="text-muted-foreground">
                  You ranked <span className="font-semibold text-warning">#{latestMark.rank}</span> in {latestMark.paperName}!
                </p>
              </div>
            </div>
            <Link to="/lms/performance" className="flex items-center gap-2 text-warning hover:text-warning/80 font-semibold transition-colors group">
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Video Lessons</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Video className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display">{videosData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Available to watch</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resources</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display">{resourcesData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Available downloads</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Papers Done</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display">{studentMarks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed tests</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display">{avgScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badges Section */}
      <Card className="border-border/50 overflow-hidden">
        <CardContent className="p-6">
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
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/lms/videos">
          <Card className="group hover-lift cursor-pointer border-border/50 h-full">
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold font-display text-lg mb-1">Watch Videos</h3>
                <p className="text-sm text-muted-foreground">Latest lessons available</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/lms/resources">
          <Card className="group hover-lift cursor-pointer border-border/50 h-full">
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold font-display text-lg mb-1">Download Resources</h3>
                <p className="text-sm text-muted-foreground">Notes and past papers</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/lms/performance">
          <Card className="group hover-lift cursor-pointer border-border/50 h-full">
            <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-bold font-display text-lg mb-1">View Performance</h3>
                <p className="text-sm text-muted-foreground">Track your progress</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Announcements */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-display">Latest Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcementsData.slice(0, 3).map((announcement, index) => (
              <div 
                key={announcement.id} 
                className="relative pl-6 pb-4 last:pb-0 border-l-2 border-primary/20 hover:border-primary/50 transition-colors"
              >
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary -translate-x-[7px]" />
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold">{announcement.title}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(announcement.date).toLocaleDateString()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{announcement.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSDashboard;
