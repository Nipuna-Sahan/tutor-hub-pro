import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClasses, useCreateClass, useUpdateClass, useDeleteClass } from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";
import type { Class } from "@/api/types";

const AdminClasses = () => {
  const { data: classes = [], isLoading, isError, error } = useClasses();
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "", grade: "", institution: "", description: "",
    syllabus: "", timetable: "", monthlyFee: "", termFee: "", features: "",
  });

  const resetForm = () => setFormData({
    title: "", grade: "", institution: "", description: "",
    syllabus: "", timetable: "", monthlyFee: "", termFee: "", features: "",
  });

  const buildPayload = (): Omit<Class, "id"> => ({
    title: formData.title,
    grade: formData.grade,
    institution: formData.institution,
    description: formData.description,
    syllabus: formData.syllabus.split("\n").filter((s) => s.trim()),
    timetable: formData.timetable.split("\n").map((t) => {
      const [day, time] = t.split("|");
      return { day: day?.trim() || "", time: time?.trim() || "" };
    }).filter((t) => t.day && t.time),
    fees: { monthly: formData.monthlyFee, term: formData.termFee },
    features: formData.features.split("\n").filter((f) => f.trim()),
  });

  const handleAdd = () => {
    createClass.mutate(buildPayload(), {
      onSuccess: () => { setIsAddOpen(false); resetForm(); toast({ title: "Class added successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Create failed", variant: "destructive" }),
    });
  };

  const handleEdit = (classItem: Class) => {
    setEditingClass(classItem);
    setFormData({
      title: classItem.title,
      grade: classItem.grade,
      institution: classItem.institution || "",
      description: classItem.description || "",
      syllabus: classItem.syllabus.join("\n"),
      timetable: classItem.timetable.map((t) => `${t.day} | ${t.time}`).join("\n"),
      monthlyFee: classItem.fees.monthly,
      termFee: classItem.fees.term,
      features: classItem.features.join("\n"),
    });
  };

  const handleUpdate = () => {
    if (!editingClass) return;
    updateClass.mutate({ id: editingClass.id, data: buildPayload() }, {
      onSuccess: () => { setEditingClass(null); resetForm(); toast({ title: "Class updated successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Update failed", variant: "destructive" }),
    });
  };

  const handleDelete = (id: string) => {
    deleteClass.mutate(id, {
      onSuccess: () => { setDeletingId(null); toast({ title: "Class deleted successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Delete failed", variant: "destructive" }),
    });
  };

  const FormContent = () => (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label htmlFor="title">Title</Label><Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
        <div><Label htmlFor="grade">Grade</Label><Input id="grade" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} /></div>
      </div>
      <div><Label htmlFor="institution">District/Institution</Label><Input id="institution" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} placeholder="Colombo District" /></div>
      <div><Label htmlFor="description">Description</Label><Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
      <div><Label htmlFor="syllabus">Syllabus (one per line)</Label><Textarea id="syllabus" value={formData.syllabus} onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })} placeholder="Topic 1&#10;Topic 2" /></div>
      <div><Label htmlFor="timetable">Timetable (Day | Time)</Label><Textarea id="timetable" value={formData.timetable} onChange={(e) => setFormData({ ...formData, timetable: e.target.value })} placeholder="Saturday | 8:00 AM - 11:00 AM" /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label htmlFor="monthlyFee">Monthly Fee</Label><Input id="monthlyFee" value={formData.monthlyFee} onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })} placeholder="Rs. 4,500" /></div>
        <div><Label htmlFor="termFee">Term Fee</Label><Input id="termFee" value={formData.termFee} onChange={(e) => setFormData({ ...formData, termFee: e.target.value })} placeholder="Rs. 12,000" /></div>
      </div>
      <div><Label htmlFor="features">Features (one per line)</Label><Textarea id="features" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} /></div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary to-accent shrink-0">
            <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold font-display">Classes</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Manage class schedules</p>
          </div>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" />Add Class</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Class</DialogTitle><DialogDescription>Enter the details for the new class</DialogDescription></DialogHeader>
            <FormContent />
            <DialogFooter><Button onClick={handleAdd} disabled={createClass.isPending} className="w-full sm:w-auto">{createClass.isPending ? "Adding..." : "Add Class"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <LoadingState message="Loading classes..." />
      ) : isError ? (
        <ErrorState message={error instanceof Error ? error.message : "Failed to load classes"} />
      ) : (
        <>
          <div className="grid gap-3 md:hidden">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{classItem.title}</h3>
                      <p className="text-xs text-muted-foreground">{classItem.grade}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(classItem)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeletingId(classItem.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="secondary">{classItem.fees.monthly}/mo</Badge>
                    <Badge variant="outline">{classItem.fees.term}/term</Badge>
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
                      <TableHead className="font-semibold">Title</TableHead>
                      <TableHead className="font-semibold">Grade</TableHead>
                      <TableHead className="font-semibold">Monthly Fee</TableHead>
                      <TableHead className="font-semibold">Term Fee</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((classItem) => (
                      <TableRow key={classItem.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{classItem.title}</TableCell>
                        <TableCell><Badge variant="outline">{classItem.grade}</Badge></TableCell>
                        <TableCell>{classItem.fees.monthly}</TableCell>
                        <TableCell>{classItem.fees.term}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(classItem)}><Pencil className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeletingId(classItem.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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

      <Dialog open={!!editingClass} onOpenChange={() => { setEditingClass(null); resetForm(); }}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Class</DialogTitle><DialogDescription>Update the class details</DialogDescription></DialogHeader>
          <FormContent />
          <DialogFooter><Button onClick={handleUpdate} disabled={updateClass.isPending} className="w-full sm:w-auto">{updateClass.isPending ? "Updating..." : "Update Class"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the class.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletingId && handleDelete(deletingId)} className="w-full sm:w-auto">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminClasses;
