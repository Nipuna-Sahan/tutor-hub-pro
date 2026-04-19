import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useStudents, useCreateStudent, useDeleteStudent } from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";

const AdminStudents = () => {
  const { data: students = [], isLoading, isError, error } = useStudents();
  const createStudent = useCreateStudent();
  const deleteStudent = useDeleteStudent();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteStudent.mutate(id, {
      onSuccess: () => toast.success("Student deleted successfully"),
      onError: (err) => toast.error(err instanceof Error ? err.message : "Delete failed"),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      grade: String(fd.get("grade") || ""),
      class: String(fd.get("class") || ""),
      joinedDate: new Date().toISOString().split("T")[0],
      attendance: 0,
      totalPapers: 0,
      averageScore: 0,
    };
    createStudent.mutate(payload, {
      onSuccess: () => {
        toast.success("Student saved successfully");
        setDialogOpen(false);
      },
      onError: (err) => toast.error(err instanceof Error ? err.message : "Create failed"),
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary to-accent shrink-0">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold font-display">Students</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Manage student records</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" required /></div>
                <div><Label htmlFor="grade">Grade</Label><Input id="grade" name="grade" required /></div>
              </div>
              <div><Label htmlFor="class">Class</Label><Input id="class" name="class" required /></div>
              <Button type="submit" className="w-full" disabled={createStudent.isPending}>
                {createStudent.isPending ? "Saving..." : "Save Student"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <LoadingState message="Loading students..." />
      ) : isError ? (
        <ErrorState message={error instanceof Error ? error.message : "Failed to load students"} />
      ) : (
        <>
          <div className="grid gap-3 md:hidden">
            {students.map((student) => (
              <Card key={student.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{student.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(student.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">{student.grade}</Badge>
                    <Badge variant="secondary">{student.class}</Badge>
                    <Badge className="bg-success/10 text-success border-success/30">{student.attendance}%</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="hidden md:block border-border/50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold hidden lg:table-cell">Email</TableHead>
                      <TableHead className="font-semibold hidden xl:table-cell">Phone</TableHead>
                      <TableHead className="font-semibold">Grade</TableHead>
                      <TableHead className="font-semibold">Class</TableHead>
                      <TableHead className="font-semibold">Attendance</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{student.email}</TableCell>
                        <TableCell className="hidden xl:table-cell text-muted-foreground">{student.phone}</TableCell>
                        <TableCell><Badge variant="outline">{student.grade}</Badge></TableCell>
                        <TableCell className="max-w-[150px] truncate">{student.class}</TableCell>
                        <TableCell>
                          <Badge className="bg-success/10 text-success border-success/30">{student.attendance}%</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(student.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminStudents;
