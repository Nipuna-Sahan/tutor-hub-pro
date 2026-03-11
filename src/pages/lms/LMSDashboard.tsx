import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, FileText, CheckSquare, Award, TrendingUp, Trophy, Star, Sparkles, ArrowRight, Calendar, Clock, Flame, Target, BookOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AchievementBadges } from "@/components/AchievementBadges";
import { motion } from "framer-motion";
import videosData from "@/data/videos.json";
import resourcesData from "@/data/resources.json";
import announcementsData from "@/data/announcements.json";
import marksData from "@/data/marks.json";
import studentsData from "@/data/students.json";
import classesData from "@/data/classes.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
  }
};

const LMSDashboard = () => {
  const studentId = "std-001";
  const student = studentsData.find(s => s.id === studentId);
  const studentMarks = marksData.filter(m => m.studentId === studentId);
  const avgScore = studentMarks.length > 0 
    ? Math.round(studentMarks.reduce((acc, m) => acc + m.score, 0) / studentMarks.length)
    : 0;
  
  const latestMark = studentMarks.length > 0 ? studentMarks[studentMarks.length - 1] : null;
  const isTopRanked = latestMark && latestMark.rank <= 3;

  const hasAGrade = studentMarks.some(m => m.score >= 80);
  const perfectScores = studentMarks.filter(m => m.score === 100).length;
  const attendance = student?.attendance || 0;

  // Study streak calculation (mock)
  const studyStreak = 7;
  const weeklyGoal = 5;
  const weeklyCompleted = 3;

  // Upcoming events (mock)
  const upcomingEvents = [
    { title: "Physics Test", date: "Mar 15", type: "test", color: "text-destructive" },
    { title: "Chemistry Lab", date: "Mar 17", type: "class", color: "text-info" },
    { title: "Assignment Due", date: "Mar 20", type: "assignment", color: "text-warning" },
  ];

  // Recent scores for mini chart
  const recentScores = studentMarks.slice(-5).map(m => m.score);

  return (
    <motion.div 
      className="space-y-4 md:space-y-6 lg:space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background p-4 md:p-6 lg:p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-primary">Welcome back</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-1 md:mb-2">
              Hello, {student?.name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">Continue your learning journey and achieve greatness</p>
          </div>
          
          {/* Study Streak Badge */}
          <motion.div 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-warning/10 to-orange-500/10 border border-warning/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center shadow-lg">
              <Flame className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold font-display text-warning">{studyStreak} Days</div>
              <div className="text-xs text-muted-foreground">Study Streak 🔥</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Top Rank Celebration */}
      {isTopRanked && (
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl border-2 border-warning/50 bg-gradient-to-r from-warning/10 via-orange-500/10 to-warning/10 p-4 md:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15),transparent_50%)]" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <motion.div 
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center shadow-gold-glow shrink-0"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
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
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { title: "Video Lessons", value: videosData.length, sub: "Available to watch", icon: Video, color: "primary" },
          { title: "Resources", value: resourcesData.length, sub: "Available downloads", icon: FileText, color: "accent" },
          { title: "Papers Done", value: studentMarks.length, sub: "Completed tests", icon: CheckSquare, color: "success" },
          { title: "Average Score", value: `${avgScore}%`, sub: "Overall performance", icon: TrendingUp, color: "info" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="group border-border/50 overflow-hidden relative h-full">
              <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-${stat.color}/10 flex items-center justify-center shrink-0`}>
                  <stat.icon className={`h-4 w-4 md:h-5 md:w-5 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
                <div className="text-2xl md:text-3xl font-bold font-display">{stat.value}</div>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Weekly Progress & Upcoming Events */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Weekly Goal Progress */}
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="p-4 md:p-6 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-base md:text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Weekly Goal
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {weeklyCompleted}/{weeklyGoal} Tasks
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{Math.round((weeklyCompleted / weeklyGoal) * 100)}%</span>
              </div>
              <Progress value={(weeklyCompleted / weeklyGoal) * 100} className="h-3" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Videos", done: true },
                { label: "Quiz", done: true },
                { label: "Notes", done: true },
                { label: "Practice", done: false },
                { label: "Review", done: false },
              ].slice(0, 3).map((task, i) => (
                <div key={i} className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg ${task.done ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {task.done ? <CheckSquare className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {task.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="p-4 md:p-6 pb-3">
            <CardTitle className="font-display text-base md:text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0`}>
                    {event.type === 'test' && <BookOpen className={`w-4 h-4 ${event.color}`} />}
                    {event.type === 'class' && <Zap className={`w-4 h-4 ${event.color}`} />}
                    {event.type === 'assignment' && <FileText className={`w-4 h-4 ${event.color}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Performance Mini Chart */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="p-4 md:p-6 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-base md:text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Recent Scores
              </CardTitle>
              <Link to="/lms/performance" className="text-xs text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="flex items-end gap-2 h-20">
              {recentScores.map((score, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-primary/60 relative group cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: `${score}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-card px-1 rounded shadow-sm">
                    {score}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {recentScores.map((_, i) => (
                <div key={i} className="flex-1 text-center text-[10px] text-muted-foreground">
                  Test {i + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievement Badges Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/50 overflow-hidden">
          <CardContent className="p-3 md:p-6">
            <AchievementBadges
              testsCompleted={studentMarks.length}
              averageScore={avgScore}
              attendance={attendance}
              hasAGrade={hasAGrade}
              perfectScores={perfectScores}
              streakDays={studyStreak}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { to: "/lms/videos", icon: Video, title: "Watch Videos", desc: "Latest lessons", color: "primary" },
          { to: "/lms/resources", icon: FileText, title: "Resources", desc: "Notes & papers", color: "accent" },
          { to: "/lms/performance", icon: Award, title: "Performance", desc: "Track progress", color: "success" },
          { to: "/lms/leaderboard", icon: Trophy, title: "Leaderboard", desc: "Rankings", color: "warning" },
        ].map((action, index) => (
          <Link key={action.to} to={action.to}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group hover-lift cursor-pointer border-border/50 h-full">
                <CardContent className="p-4 md:pt-6 md:pb-5 text-center relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-${action.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 rounded-xl md:rounded-2xl bg-${action.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className={`w-6 h-6 md:w-7 md:h-7 text-${action.color}`} />
                    </div>
                    <h3 className="font-bold font-display text-sm md:text-base mb-0.5">{action.title}</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block">{action.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Recent Announcements */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/50">
          <CardHeader className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-base md:text-lg">Latest Announcements</CardTitle>
              <Link to="/lms/announcements" className="text-xs text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="space-y-3 md:space-y-4">
              {announcementsData.slice(0, 3).map((announcement, index) => (
                <motion.div 
                  key={announcement.id} 
                  className="relative pl-4 md:pl-6 pb-3 md:pb-4 last:pb-0 border-l-2 border-primary/20 hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="absolute left-0 top-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary -translate-x-[5px] md:-translate-x-[7px]" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                    <h4 className="font-semibold text-sm md:text-base">{announcement.title}</h4>
                    <Badge variant="secondary" className="text-[10px] md:text-xs w-fit">
                      {new Date(announcement.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LMSDashboard;
