import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import papersData from "@/data/papers.json";

const AdminPapers = () => {
  const [papers, setPapers] = useState(papersData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPaper, setEditingPaper] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    type: "past-paper",
    grade: "",
    totalMarks: "",
    duration: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      type: "past-paper",
      grade: "",
      totalMarks: "",
      duration: "",
    });
  };

  const handleAdd = () => {
    const newPaper = {
      id: `paper-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      grade: formData.grade,
      totalMarks: parseInt(formData.totalMarks),
      duration: formData.duration,
      uploadDate: new Date().toISOString().split("T")[0],
    };

    setPapers([...papers, newPaper]);
    setIsAddOpen(false);
    resetForm();
    toast({ title: "Paper added successfully" });
  };

  const handleEdit = (paper: any) => {
    setEditingPaper(paper);
    setFormData({
      title: paper.title,
      type: paper.type,
      grade: paper.grade,
      totalMarks: paper.totalMarks.toString(),
      duration: paper.duration,
    });
  };

  const handleUpdate = () => {
    const updatedPapers = papers.map(p =>
      p.id === editingPaper.id
        ? {
            ...p,
            title: formData.title,
            type: formData.type,
            grade: formData.grade,
            totalMarks: parseInt(formData.totalMarks),
            duration: formData.duration,
          }
        : p
    );

    setPapers(updatedPapers);
    setEditingPaper(null);
    resetForm();
    toast({ title: "Paper updated successfully" });
  };

  const handleDelete = (id: string) => {
    setPapers(papers.filter(p => p.id !== id));
    setDeletingId(null);
    toast({ title: "Paper deleted successfully" });
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "past-paper": "default",
      "monthly-test": "secondary",
      "term-test": "outline",
    };
    return <Badge variant={variants[type] || "default"}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Papers Management</h1>
          <p className="text-muted-foreground">Manage past papers and tests</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Paper
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Paper</DialogTitle>
              <DialogDescription>Create a new test paper</DialogDescription>
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
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="past-paper">Past Paper</SelectItem>
                    <SelectItem value="monthly-test">Monthly Test</SelectItem>
                    <SelectItem value="term-test">Term Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="Grade 11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="3 hours"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Add Paper</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {papers.map((paper) => (
              <TableRow key={paper.id}>
                <TableCell className="font-medium">{paper.title}</TableCell>
                <TableCell>{getTypeBadge(paper.type)}</TableCell>
                <TableCell>{paper.grade}</TableCell>
                <TableCell>{paper.totalMarks}</TableCell>
                <TableCell>{paper.duration}</TableCell>
                <TableCell>{paper.uploadDate}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(paper)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingId(paper.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingPaper} onOpenChange={() => { setEditingPaper(null); resetForm(); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Paper</DialogTitle>
            <DialogDescription>Update the paper details</DialogDescription>
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
              <Label htmlFor="edit-type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="past-paper">Past Paper</SelectItem>
                  <SelectItem value="monthly-test">Monthly Test</SelectItem>
                  <SelectItem value="term-test">Term Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-grade">Grade</Label>
              <Input
                id="edit-grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-totalMarks">Total Marks</Label>
                <Input
                  id="edit-totalMarks"
                  type="number"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Paper</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the paper.
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

export default AdminPapers;
