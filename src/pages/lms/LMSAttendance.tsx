import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Attendance</h1>
        <p className="text-muted-foreground">Track your class attendance</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalClasses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="text-3xl font-bold">{presentCount}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <div className="text-3xl font-bold">{absentCount}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{attendancePercentage}%</div>
            <Progress value={attendancePercentage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
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
                  backgroundColor: "hsl(var(--primary))",
                  color: "white",
                  fontWeight: "bold"
                },
                absent: { 
                  backgroundColor: "hsl(var(--destructive))",
                  color: "white",
                  fontWeight: "bold"
                }
              }}
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-destructive" />
                <span>Absent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentAttendance
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(record => (
                    <TableRow key={record.id}>
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
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LMSAttendance;
