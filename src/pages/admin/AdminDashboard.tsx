import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, FileText, BarChart3, TrendingUp, Calendar, DollarSign, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import studentsData from "@/data/students.json";
import classesData from "@/data/classes.json";
import resourcesData from "@/data/resources.json";
import marksData from "@/data/marks.json";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  // Calculate some analytics
  const avgAttendance = Math.round(studentsData.reduce((acc, s) => acc + s.attendance, 0) / studentsData.length);
  const avgScore = Math.round(studentsData.reduce((acc, s) => acc + s.averageScore, 0) / studentsData.length);

  // Mock chart data
  const enrollmentData = [
    { month: "Jan", students: 15 },
    { month: "Feb", students: 22 },
    { month: "Mar", students: 28 },
    { month: "Apr", students: 35 },
    { month: "May", students: 42 },
    { month: "Jun", students: 48 },
  ];

  const performanceData = [
    { month: "Jan", average: 65 },
    { month: "Feb", average: 68 },
    { month: "Mar", average: 72 },
    { month: "Apr", average: 75 },
    { month: "May", average: 78 },
    { month: "Jun", average: 82 },
  ];

  const stats = [
    { 
      title: "Total Students", 
      value: studentsData.length, 
      icon: Users, 
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+12%",
      trend: "up"
    },
    { 
      title: "Active Classes", 
      value: classesData.length, 
      icon: GraduationCap, 
      color: "text-info",
      bgColor: "bg-info/10",
      change: "+3",
      trend: "up"
    },
    { 
      title: "Resources", 
      value: resourcesData.length, 
      icon: FileText, 
      color: "text-success",
      bgColor: "bg-success/10",
      change: "+8",
      trend: "up"
    },
    { 
      title: "Avg. Score", 
      value: `${avgScore}%`, 
      icon: BarChart3, 
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "+5%",
      trend: "up"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">Welcome back! Here's your overview.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-border/50 bg-gradient-to-br from-card to-muted/20 overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity", stat.bgColor.replace('/10', '/5'))} />
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 md:p-3 rounded-xl", stat.bgColor)}>
                  <stat.icon className={cn("w-4 h-4 md:w-5 md:h-5", stat.color)} />
                </div>
                <Badge variant="outline" className="text-success border-success/30 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Users className="w-5 h-5 text-primary" />
              Student Enrollment Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="w-5 h-5 text-success" />
              Average Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="average" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: "hsl(var(--success))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats & Recent Students */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <span className="text-sm text-muted-foreground">Avg. Attendance</span>
              <span className="font-bold text-success">{avgAttendance}%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <span className="text-sm text-muted-foreground">Total Papers</span>
              <span className="font-bold">{marksData.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <span className="text-sm text-muted-foreground">Active Months</span>
              <span className="font-bold">6</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-success/10">
              <span className="text-sm text-muted-foreground">Revenue (Est.)</span>
              <span className="font-bold text-success">Rs. 125,000</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Users className="w-5 h-5 text-primary" />
              Recent Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentsData.slice(0, 5).map((student, index) => (
                <div 
                  key={student.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="font-bold text-primary">{student.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">{student.grade}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Score: {student.averageScore}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
