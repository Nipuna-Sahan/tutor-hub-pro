import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import marksData from "@/data/marks.json";
import studentsData from "@/data/students.json";
import papersData from "@/data/papers.json";

const AdminMarks = () => {
  const [marks, setMarks] = useState(marksData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [editingMark, setEditingMark] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    studentId: "",
    paperId: "",
    score: "",
    rank: "",
  });

  const [bulkData, setBulkData] = useState("");

  const resetForm = () => {
    setFormData({
      studentId: "",
      paperId: "",
      score: "",
      rank: "",
    });
  };

  const handleAdd = () => {
    const paper = papersData.find(p => p.id === formData.paperId);
    const student = studentsData.find(s => s.id === formData.studentId);

    if (!paper || !student) {
      toast({ title: "Invalid student or paper selected", variant: "destructive" });
      return;
    }

    const newMark = {
      id: `mark-${Date.now()}`,
      studentId: formData.studentId,
      paperId: formData.paperId,
      paperName: paper.title,
      type: paper.type,
      date: new Date().toISOString().split("T")[0],
      score: parseInt(formData.score),
      totalMarks: paper.totalMarks,
      rank: parseInt(formData.rank),
    };

    setMarks([...marks, newMark]);
    setIsAddOpen(false);
    resetForm();
    toast({ title: "Mark added successfully" });
  };

  const handleBulkImport = () => {
    try {
      const lines = bulkData.trim().split("\n");
      const newMarks = lines.map(line => {
        const [studentId, paperId, score, rank] = line.split(",").map(s => s.trim());
        const paper = papersData.find(p => p.id === paperId);
        const student = studentsData.find(s => s.id === studentId);

        if (!paper || !student) return null;

        return {
          id: `mark-${Date.now()}-${Math.random()}`,
          studentId,
          paperId,
          paperName: paper.title,
          type: paper.type,
          date: new Date().toISOString().split("T")[0],
          score: parseInt(score),
          totalMarks: paper.totalMarks,
          rank: parseInt(rank),
        };
      }).filter(Boolean);

      setMarks([...marks, ...newMarks]);
      setIsBulkOpen(false);
      setBulkData("");
      toast({ title: `${newMarks.length} marks imported successfully` });
    } catch (error) {
      toast({ title: "Invalid format. Please check your data.", variant: "destructive" });
    }
  };

  const handleEdit = (mark: any) => {
    setEditingMark(mark);
    setFormData({
      studentId: mark.studentId,
      paperId: mark.paperId,
      score: mark.score.toString(),
      rank: mark.rank.toString(),
    });
  };

  const handleUpdate = () => {
    const paper = papersData.find(p => p.id === formData.paperId);

    const updatedMarks = marks.map(m =>
      m.id === editingMark.id
        ? {
            ...m,
            studentId: formData.studentId,
            paperId: formData.paperId,
            paperName: paper?.title || m.paperName,
            score: parseInt(formData.score),
            rank: parseInt(formData.rank),
          }
        : m
    );

    setMarks(updatedMarks);
    setEditingMark(null);
    resetForm();
    toast({ title: "Mark updated successfully" });
  };

  const handleDelete = (id: string) => {
    setMarks(marks.filter(m => m.id !== id));
    setDeletingId(null);
    toast({ title: "Mark deleted successfully" });
  };

  const getScoreBadge = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 75) return <Badge className="bg-green-600">A</Badge>;
    if (percentage >= 65) return <Badge className="bg-blue-600">B</Badge>;
    if (percentage >= 50) return <Badge className="bg-yellow-600">C</Badge>;
    return <Badge variant="destructive">S</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marks Management</h1>
          <p className="text-muted-foreground">Record and manage student marks</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isBulkOpen} onOpenChange={setIsBulkOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Import
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Bulk Import Marks</DialogTitle>
                <DialogDescription>
                  Import multiple marks at once. Format: studentId, paperId, score, rank (one per line)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  rows={10}
                  placeholder="std-001, paper-1, 85, 2&#10;std-002, paper-1, 78, 5"
                />
              </div>
              <DialogFooter>
                <Button onClick={handleBulkImport}>Import Marks</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Mark
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Mark</DialogTitle>
                <DialogDescription>Record student marks for a paper</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="studentId">Student</Label>
                  <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {studentsData.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} - {student.grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paperId">Paper</Label>
                  <Select value={formData.paperId} onValueChange={(value) => setFormData({ ...formData, paperId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select paper" />
                    </SelectTrigger>
                    <SelectContent>
                      {papersData.map(paper => (
                        <SelectItem key={paper.id} value={paper.id}>
                          {paper.title} ({paper.totalMarks} marks)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="score">Score</Label>
                    <Input
                      id="score"
                      type="number"
                      value={formData.score}
                      onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rank">Rank</Label>
                    <Input
                      id="rank"
                      type="number"
                      value={formData.rank}
                      onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAdd}>Add Mark</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Paper</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marks.map((mark) => (
              <TableRow key={mark.id}>
                <TableCell className="font-medium">{mark.studentId}</TableCell>
                <TableCell>{mark.paperName}</TableCell>
                <TableCell>{mark.date}</TableCell>
                <TableCell>{mark.score}/{mark.totalMarks}</TableCell>
                <TableCell>{getScoreBadge(mark.score, mark.totalMarks)}</TableCell>
                <TableCell>#{mark.rank}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(mark)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingId(mark.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingMark} onOpenChange={() => { setEditingMark(null); resetForm(); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Mark</DialogTitle>
            <DialogDescription>Update the mark details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-studentId">Student</Label>
              <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {studentsData.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-paperId">Paper</Label>
              <Select value={formData.paperId} onValueChange={(value) => setFormData({ ...formData, paperId: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {papersData.map(paper => (
                    <SelectItem key={paper.id} value={paper.id}>
                      {paper.title} ({paper.totalMarks} marks)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-score">Score</Label>
                <Input
                  id="edit-score"
                  type="number"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-rank">Rank</Label>
                <Input
                  id="edit-rank"
                  type="number"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Mark</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the mark record.
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

export default AdminMarks;
