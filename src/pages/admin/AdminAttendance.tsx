import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import studentsData from "@/data/students.json";
import attendanceData from "@/data/attendance.json";
import classesData from "@/data/classes.json";

const AdminAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent">>(
    () => {
      const dateStr = format(new Date(), "yyyy-MM-dd");
      const todayAttendance: Record<string, "present" | "absent"> = {};
      attendanceData
        .filter(a => a.date === dateStr)
        .forEach(a => {
          todayAttendance[a.studentId] = a.status as "present" | "absent";
        });
      return todayAttendance;
    }
  );

  const filteredStudents = selectedClass === "all" 
    ? studentsData 
    : studentsData.filter(s => s.class === selectedClass);

  const handleAttendanceToggle = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present"
    }));
  };

  const handleSave = () => {
    toast.success("Attendance saved successfully");
  };

  const getAttendanceStats = (studentId: string) => {
    const studentAttendance = attendanceData.filter(a => a.studentId === studentId);
    const present = studentAttendance.filter(a => a.status === "present").length;
    const total = studentAttendance.length;
    return { present, total, percentage: total > 0 ? Math.round((present / total) * 100) : 0 };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <p className="text-muted-foreground">Track student attendance</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border pointer-events-auto"
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mark Attendance - {format(selectedDate, "PPP")}</CardTitle>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classesData.map(cls => (
                      <SelectItem key={cls.id} value={cls.title}>
                        {cls.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Overall</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map(student => {
                    const stats = getAttendanceStats(student.id);
                    const status = attendance[student.id] || "absent";
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="font-medium">{stats.percentage}%</span>
                            <span className="text-muted-foreground"> ({stats.present}/{stats.total})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={status === "present" ? "default" : "destructive"}>
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={status === "present" ? "outline" : "default"}
                            size="sm"
                            onClick={() => handleAttendanceToggle(student.id)}
                          >
                            Mark {status === "present" ? "Absent" : "Present"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSave}>Save Attendance</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
