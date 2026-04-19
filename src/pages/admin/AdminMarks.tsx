import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Upload, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useMarks, useStudents, usePapers,
  useCreateMark, useUpdateMark, useDeleteMark, useBulkCreateMarks,
} from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";
import type { Mark } from "@/api/types";

const AdminMarks = () => {
  const { data: marks = [], isLoading, isError, error } = useMarks();
  const { data: students = [] } = useStudents();
  const { data: papers = [] } = usePapers();
  const createMark = useCreateMark();
  const updateMark = useUpdateMark();
  const deleteMark = useDeleteMark();
  const bulkCreate = useBulkCreateMarks();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [editingMark, setEditingMark] = useState<Mark | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({ studentId: "", paperId: "", score: "", rank: "" });
  const [bulkData, setBulkData] = useState("");

  const resetForm = () => setFormData({ studentId: "", paperId: "", score: "", rank: "" });

  const buildMark = (): Omit<Mark, "id"> | null => {
    const paper = papers.find((p) => p.id === formData.paperId);
    const student = students.find((s) => s.id === formData.studentId);
    if (!paper || !student) return null;
    return {
      studentId: formData.studentId,
      studentName: student.name,
      paperId: formData.paperId,
      paperName: paper.title,
      paperTitle: paper.title,
      type: paper.type,
      date: new Date().toISOString().split("T")[0],
      score: parseInt(formData.score),
      totalMarks: paper.totalMarks,
      rank: parseInt(formData.rank),
    };
  };

  const handleAdd = () => {
    const payload = buildMark();
    if (!payload) return toast({ title: "Invalid student or paper", variant: "destructive" });
    createMark.mutate(payload, {
      onSuccess: () => { setIsAddOpen(false); resetForm(); toast({ title: "Mark added successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Create failed", variant: "destructive" }),
    });
  };

  const handleBulkImport = () => {
    try {
      const lines = bulkData.trim().split("\n");
      const newMarks: Omit<Mark, "id">[] = [];
      for (const line of lines) {
        const [studentId, paperId, score, rank] = line.split(",").map((s) => s.trim());
        const paper = papers.find((p) => p.id === paperId);
        const student = students.find((s) => s.id === studentId);
        if (!paper || !student) continue;
        newMarks.push({
          studentId, studentName: student.name, paperId,
          paperName: paper.title, paperTitle: paper.title, type: paper.type,
          date: new Date().toISOString().split("T")[0],
          score: parseInt(score), totalMarks: paper.totalMarks, rank: parseInt(rank),
        });
      }
      bulkCreate.mutate(newMarks, {
        onSuccess: () => { setIsBulkOpen(false); setBulkData(""); toast({ title: `${newMarks.length} marks imported successfully` }); },
        onError: (err) => toast({ title: err instanceof Error ? err.message : "Import failed", variant: "destructive" }),
      });
    } catch {
      toast({ title: "Invalid format. Please check your data.", variant: "destructive" });
    }
  };

  const handleEdit = (mark: Mark) => {
    setEditingMark(mark);
    setFormData({
      studentId: mark.studentId, paperId: mark.paperId,
      score: mark.score.toString(), rank: mark.rank.toString(),
    });
  };

  const handleUpdate = () => {
    if (!editingMark) return;
    const paper = papers.find((p) => p.id === formData.paperId);
    updateMark.mutate({
      id: editingMark.id,
      data: {
        studentId: formData.studentId,
        paperId: formData.paperId,
        paperName: paper?.title || editingMark.paperName,
        score: parseInt(formData.score),
        rank: parseInt(formData.rank),
      },
    }, {
      onSuccess: () => { setEditingMark(null); resetForm(); toast({ title: "Mark updated successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Update failed", variant: "destructive" }),
    });
  };

  const handleDelete = (id: string) => {
    deleteMark.mutate(id, {
      onSuccess: () => { setDeletingId(null); toast({ title: "Mark deleted successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Delete failed", variant: "destructive" }),
    });
  };

  const getScoreBadge = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 75) return <Badge className="bg-success/20 text-success border-success/30">A</Badge>;
    if (percentage >= 65) return <Badge className="bg-info/20 text-info border-info/30">B</Badge>;
    if (percentage >= 50) return <Badge className="bg-warning/20 text-warning border-warning/30">C</Badge>;
    return <Badge className="bg-destructive/20 text-destructive border-destructive/30">S</Badge>;
  };

  const FormContent = () => (
    <div className="space-y-4">
      <div>
        <Label>Student</Label>
        <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
          <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select student" /></SelectTrigger>
          <SelectContent>
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id}>{student.name} - {student.grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Paper</Label>
        <Select value={formData.paperId} onValueChange={(value) => setFormData({ ...formData, paperId: value })}>
          <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select paper" /></SelectTrigger>
          <SelectContent>
            {papers.map((paper) => (
              <SelectItem key={paper.id} value={paper.id}>{paper.title} ({paper.totalMarks} marks)</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Score</Label><Input type="number" value={formData.score} onChange={(e) => setFormData({ ...formData, score: e.target.value })} /></div>
        <div><Label>Rank</Label><Input type="number" value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })} /></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary to-accent shrink-0">
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold font-display">Marks</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Manage student marks</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isBulkOpen} onOpenChange={setIsBulkOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto"><Upload className="mr-2 h-4 w-4" />Bulk Import</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl">
              <DialogHeader><DialogTitle>Bulk Import Marks</DialogTitle><DialogDescription>Format: studentId, paperId, score, rank</DialogDescription></DialogHeader>
              <Textarea value={bulkData} onChange={(e) => setBulkData(e.target.value)} rows={8} placeholder="std-001, paper-1, 85, 2" />
              <DialogFooter><Button onClick={handleBulkImport} disabled={bulkCreate.isPending} className="w-full sm:w-auto">{bulkCreate.isPending ? "Importing..." : "Import"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" />Add Mark</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-lg">
              <DialogHeader><DialogTitle>Add New Mark</DialogTitle></DialogHeader>
              <FormContent />
              <DialogFooter><Button onClick={handleAdd} disabled={createMark.isPending} className="w-full sm:w-auto">{createMark.isPending ? "Saving..." : "Add Mark"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Loading marks..." />
      ) : isError ? (
        <ErrorState message={error instanceof Error ? error.message : "Failed to load marks"} />
      ) : (
        <>
          <div className="grid gap-3 md:hidden">
            {marks.map((mark) => (
              <Card key={mark.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm truncate">{mark.paperName}</h3>
                      <p className="text-xs text-muted-foreground">{mark.studentId} • {mark.date}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(mark)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeletingId(mark.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{mark.score}/{mark.totalMarks}</Badge>
                    {getScoreBadge(mark.score, mark.totalMarks)}
                    <Badge variant="outline">#{mark.rank}</Badge>
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
                      <TableHead className="font-semibold">Student</TableHead>
                      <TableHead className="font-semibold">Paper</TableHead>
                      <TableHead className="font-semibold hidden lg:table-cell">Date</TableHead>
                      <TableHead className="font-semibold">Score</TableHead>
                      <TableHead className="font-semibold">Grade</TableHead>
                      <TableHead className="font-semibold">Rank</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marks.map((mark) => (
                      <TableRow key={mark.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{mark.studentName || mark.studentId}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{mark.paperName}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{mark.date}</TableCell>
                        <TableCell>{mark.score}/{mark.totalMarks}</TableCell>
                        <TableCell>{getScoreBadge(mark.score, mark.totalMarks)}</TableCell>
                        <TableCell>#{mark.rank}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(mark)}><Pencil className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeletingId(mark.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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

      <Dialog open={!!editingMark} onOpenChange={() => { setEditingMark(null); resetForm(); }}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg">
          <DialogHeader><DialogTitle>Edit Mark</DialogTitle></DialogHeader>
          <FormContent />
          <DialogFooter><Button onClick={handleUpdate} disabled={updateMark.isPending} className="w-full sm:w-auto">{updateMark.isPending ? "Updating..." : "Update"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the mark record.</AlertDialogDescription>
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

export default AdminMarks;
