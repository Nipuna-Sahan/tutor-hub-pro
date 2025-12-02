import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, CalendarDays, TrendingUp, Target, Award } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import attendanceData from "@/data/attendance.json";

const LMSAttendance = () => {
  const studentId = "std-001"; // Mock student ID
  const studentAttendance = attendanceData.filter(a => a.studentId === studentId);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Calculate statistics
  const totalClasses = studentAttendance.length;
  const presentCount = studentAttendance.filter(a => a.status === "present").length;
  const absentCount = totalClasses - presentCount;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  // Get dates with attendance
  const attendanceDates = studentAttendance.reduce((acc, curr) => {
    acc[curr.date] = curr.status;
    return acc;
  }, {} as Record<string, string>);

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 75) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-warning/10 via-success/5 to-background p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-warning/20 to-success/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-warning to-warning/70 flex items-center justify-center shadow-lg">
            <CalendarDays className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">My Attendance</h1>
            <p className="text-muted-foreground">Track your class attendance and stay consistent</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-border/50 group hover-lift overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Total Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display">{totalClasses}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 group hover-lift overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold font-display text-success">{presentCount}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 group hover-lift overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display text-destructive">{absentCount}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 group hover-lift overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold font-display mb-2 ${getAttendanceColor(attendancePercentage)}`}>
              {attendancePercentage}%
            </div>
            <Progress value={attendancePercentage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Attendance Status Badge */}
      {attendancePercentage >= 90 && (
        <Card className="border-success/30 bg-gradient-to-r from-success/5 via-transparent to-transparent">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-semibold text-success">Excellent Attendance!</p>
              <p className="text-sm text-muted-foreground">Keep up the great work! You're on track for perfect attendance.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-xl border border-border/50 pointer-events-auto"
              modifiers={{
                present: (date) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  return attendanceDates[dateStr] === "present";
                },
                absent: (date) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  return attendanceDates[dateStr] === "absent";
                }
              }}
              modifiersStyles={{
                present: { 
                  backgroundColor: "hsl(var(--success))",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px"
                },
                absent: { 
                  backgroundColor: "hsl(var(--destructive))",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px"
                }
              }}
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md bg-success" />
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md bg-destructive" />
                <span>Absent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance History */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="font-display">Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentAttendance
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((record, index) => (
                      <TableRow 
                        key={record.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <TableCell className="font-medium">
                          {format(new Date(record.date), "PPP")}
                        </TableCell>
                        <TableCell>{record.class}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={record.status === "present" ? "default" : "destructive"}
                            className="flex items-center gap-1 w-fit"
                          >
                            {record.status === "present" ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LMSAttendance;
