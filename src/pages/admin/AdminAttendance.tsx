import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarDays, Check, X, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useStudents, useClasses, useAttendance, useBulkMarkAttendance,
} from "@/hooks/api";
import { LoadingState } from "@/components/QueryState";

const AdminAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");

  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const { data: students = [], isLoading: studentsLoading } = useStudents();
  const { data: classes = [] } = useClasses();
  const { data: dayAttendance = [] } = useAttendance(dateStr);
  const bulkMark = useBulkMarkAttendance();

  const initialAttendance = useMemo(() => {
    const map: Record<string, "present" | "absent"> = {};
    dayAttendance.forEach((a) => { map[a.studentId] = a.status; });
    return map;
  }, [dayAttendance]);

  const [attendance, setAttendance] = useState<Record<string, "present" | "absent">>({});
  const merged = { ...initialAttendance, ...attendance };

  const filteredStudents = selectedClass === "all"
    ? students
    : students.filter((s) => s.class === selectedClass);

  const handleAttendanceToggle = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: merged[studentId] === "present" ? "absent" : "present",
    }));
  };

  const handleSave = () => {
    const records = Object.entries(merged).map(([studentId, status]) => ({
      studentId, date: dateStr, status,
    }));
    bulkMark.mutate(records, {
      onSuccess: () => toast.success("Attendance saved successfully"),
      onError: (err) => toast.error(err instanceof Error ? err.message : "Save failed"),
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-3xl font-bold font-display">Attendance</h1>
        <p className="text-sm text-muted-foreground">Track student attendance</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="w-4 h-4 text-primary" />Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border pointer-events-auto"
              />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <Card className="border-border/50">
            <CardHeader className="pb-2 md:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="text-base md:text-lg">{format(selectedDate, "PPP")}</CardTitle>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Filter by class" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.title}>{cls.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {studentsLoading ? (
                <LoadingState />
              ) : (
                <>
                  <div className="block md:hidden space-y-3">
                    {filteredStudents.map((student) => {
                      const status = merged[student.id] || "absent";
                      return (
                        <div key={student.id} className={cn(
                          "p-4 rounded-xl border transition-all",
                          status === "present" ? "border-success/50 bg-success/5" : "border-destructive/50 bg-destructive/5"
                        )}>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-medium text-sm">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.class}</p>
                            </div>
                            <Badge variant={status === "present" ? "default" : "destructive"} className="text-xs">{status}</Badge>
                          </div>
                          <div className="flex items-center justify-end">
                            <Button variant={status === "present" ? "outline" : "default"} size="sm" className="text-xs" onClick={() => handleAttendanceToggle(student.id)}>
                              {status === "present" ? (<><X className="h-3 w-3 mr-1" />Absent</>) : (<><Check className="h-3 w-3 mr-1" />Present</>)}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="hidden md:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead><TableHead>Class</TableHead>
                          <TableHead>Status</TableHead><TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => {
                          const status = merged[student.id] || "absent";
                          return (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.class}</TableCell>
                              <TableCell>
                                <Badge variant={status === "present" ? "default" : "destructive"}>{status}</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant={status === "present" ? "outline" : "default"} size="sm" onClick={() => handleAttendanceToggle(student.id)}>
                                  Mark {status === "present" ? "Absent" : "Present"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleSave} disabled={bulkMark.isPending} className="w-full sm:w-auto">
                      <Save className="h-4 w-4 mr-2" />
                      {bulkMark.isPending ? "Saving..." : "Save Attendance"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
