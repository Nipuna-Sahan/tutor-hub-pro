import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import classesData from "@/data/classes.json";

const AdminClasses = () => {
  const [classes, setClasses] = useState(classesData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    grade: "",
    institution: "",
    description: "",
    syllabus: "",
    timetable: "",
    monthlyFee: "",
    termFee: "",
    features: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      grade: "",
      institution: "",
      description: "",
      syllabus: "",
      timetable: "",
      monthlyFee: "",
      termFee: "",
      features: "",
    });
  };

  const handleAdd = () => {
    const newClass = {
      id: `class-${Date.now()}`,
      title: formData.title,
      grade: formData.grade,
      institution: formData.institution,
      description: formData.description,
      syllabus: formData.syllabus.split("\n").filter(s => s.trim()),
      timetable: formData.timetable.split("\n").map(t => {
        const [day, time] = t.split("|");
        return { day: day?.trim() || "", time: time?.trim() || "" };
      }).filter(t => t.day && t.time),
      fees: {
        monthly: formData.monthlyFee,
        term: formData.termFee,
      },
      features: formData.features.split("\n").filter(f => f.trim()),
    };

    setClasses([...classes, newClass]);
    setIsAddOpen(false);
    resetForm();
    toast({ title: "Class added successfully" });
  };

  const handleEdit = (classItem: any) => {
    setEditingClass(classItem);
    setFormData({
      title: classItem.title,
      grade: classItem.grade,
      institution: classItem.institution || "",
      description: classItem.description,
      syllabus: classItem.syllabus.join("\n"),
      timetable: classItem.timetable.map((t: any) => `${t.day} | ${t.time}`).join("\n"),
      monthlyFee: classItem.fees.monthly,
      termFee: classItem.fees.term,
      features: classItem.features.join("\n"),
    });
  };

  const handleUpdate = () => {
    const updatedClasses = classes.map(c =>
      c.id === editingClass.id
        ? {
            ...c,
            title: formData.title,
            grade: formData.grade,
            institution: formData.institution,
            description: formData.description,
            syllabus: formData.syllabus.split("\n").filter(s => s.trim()),
            timetable: formData.timetable.split("\n").map(t => {
              const [day, time] = t.split("|");
              return { day: day?.trim() || "", time: time?.trim() || "" };
            }).filter(t => t.day && t.time),
            fees: {
              monthly: formData.monthlyFee,
              term: formData.termFee,
            },
            features: formData.features.split("\n").filter(f => f.trim()),
          }
        : c
    );

    setClasses(updatedClasses);
    setEditingClass(null);
    resetForm();
    toast({ title: "Class updated successfully" });
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    setDeletingId(null);
    toast({ title: "Class deleted successfully" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Classes Management</h1>
          <p className="text-muted-foreground">Manage class schedules and details</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>Enter the details for the new class</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="institution">District/Institution</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="Colombo District"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="syllabus">Syllabus (one per line)</Label>
                <Textarea
                  id="syllabus"
                  value={formData.syllabus}
                  onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  placeholder="Topic 1&#10;Topic 2&#10;Topic 3"
                />
              </div>
              <div>
                <Label htmlFor="timetable">Timetable (format: Day | Time)</Label>
                <Textarea
                  id="timetable"
                  value={formData.timetable}
                  onChange={(e) => setFormData({ ...formData, timetable: e.target.value })}
                  placeholder="Saturday | 8:00 AM - 11:00 AM&#10;Sunday | 8:00 AM - 11:00 AM"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyFee">Monthly Fee</Label>
                  <Input
                    id="monthlyFee"
                    value={formData.monthlyFee}
                    onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                    placeholder="Rs. 4,500"
                  />
                </div>
                <div>
                  <Label htmlFor="termFee">Term Fee (3 months)</Label>
                  <Input
                    id="termFee"
                    value={formData.termFee}
                    onChange={(e) => setFormData({ ...formData, termFee: e.target.value })}
                    placeholder="Rs. 12,000"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Recorded Video Lessons&#10;Downloadable Notes"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Add Class</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Monthly Fee</TableHead>
              <TableHead>Term Fee</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell className="font-medium">{classItem.title}</TableCell>
                <TableCell>{classItem.grade}</TableCell>
                <TableCell>{classItem.fees.monthly}</TableCell>
                <TableCell>{classItem.fees.term}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(classItem)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingId(classItem.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingClass} onOpenChange={() => { setEditingClass(null); resetForm(); }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>Update the class details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-grade">Grade</Label>
              <Input
                id="edit-grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-syllabus">Syllabus (one per line)</Label>
              <Textarea
                id="edit-syllabus"
                value={formData.syllabus}
                onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-timetable">Timetable (format: Day | Time)</Label>
              <Textarea
                id="edit-timetable"
                value={formData.timetable}
                onChange={(e) => setFormData({ ...formData, timetable: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-monthlyFee">Monthly Fee</Label>
                <Input
                  id="edit-monthlyFee"
                  value={formData.monthlyFee}
                  onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-termFee">Term Fee (3 months)</Label>
                <Input
                  id="edit-termFee"
                  value={formData.termFee}
                  onChange={(e) => setFormData({ ...formData, termFee: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-features">Features (one per line)</Label>
              <Textarea
                id="edit-features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the class.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletingId && handleDelete(deletingId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminClasses;
