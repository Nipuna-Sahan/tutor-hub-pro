import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useAnnouncements, useCreateAnnouncement, useUpdateAnnouncement, useDeleteAnnouncement,
} from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";
import type { Announcement } from "@/api/types";

const AdminAnnouncements = () => {
  const { data: announcements = [], isLoading, isError, error } = useAnnouncements();
  const createA = useCreateAnnouncement();
  const updateA = useUpdateAnnouncement();
  const deleteA = useDeleteAnnouncement();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({ title: "", content: "", important: false });
  const resetForm = () => setFormData({ title: "", content: "", important: false });

  const handleAdd = () => {
    createA.mutate({
      title: formData.title,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
      important: formData.important,
    }, {
      onSuccess: () => { setIsAddOpen(false); resetForm(); toast({ title: "Announcement created successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Create failed", variant: "destructive" }),
    });
  };

  const handleEdit = (a: Announcement) => {
    setEditingAnnouncement(a);
    setFormData({ title: a.title, content: a.content, important: a.important });
  };

  const handleUpdate = () => {
    if (!editingAnnouncement) return;
    updateA.mutate({
      id: editingAnnouncement.id,
      data: { title: formData.title, content: formData.content, important: formData.important },
    }, {
      onSuccess: () => { setEditingAnnouncement(null); resetForm(); toast({ title: "Announcement updated successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Update failed", variant: "destructive" }),
    });
  };

  const handleDelete = (id: string) => {
    deleteA.mutate(id, {
      onSuccess: () => { setDeletingId(null); toast({ title: "Announcement deleted successfully" }); },
      onError: (err) => toast({ title: err instanceof Error ? err.message : "Delete failed", variant: "destructive" }),
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl md:text-3xl font-bold font-display">Announcements</h1>
          <p className="text-sm text-muted-foreground">Create and manage announcements</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" />Add Announcement</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create New Announcement</DialogTitle><DialogDescription>Publish a new announcement for students</DialogDescription></DialogHeader>
            <div className="space-y-4">
              <div><Label htmlFor="title">Title</Label><Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
              <div><Label htmlFor="content">Content</Label><Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={5} /></div>
              <div className="flex items-center space-x-2">
                <Switch id="important" checked={formData.important} onCheckedChange={(checked) => setFormData({ ...formData, important: checked })} />
                <Label htmlFor="important">Mark as important</Label>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2"><Button onClick={handleAdd} disabled={createA.isPending} className="w-full sm:w-auto">{createA.isPending ? "Creating..." : "Create Announcement"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <LoadingState message="Loading announcements..." />
      ) : isError ? (
        <ErrorState message={error instanceof Error ? error.message : "Failed to load announcements"} />
      ) : (
        <>
          <div className="block md:hidden space-y-3">
            {announcements.map((a) => (
              <Card key={a.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {a.important && <AlertCircle className="h-4 w-4 text-destructive shrink-0" />}
                      <span className="font-medium text-sm truncate">{a.title}</span>
                    </div>
                    {a.important
                      ? <Badge variant="destructive" className="shrink-0 text-xs">Important</Badge>
                      : <Badge variant="secondary" className="shrink-0 text-xs">Normal</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{a.date}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(a)}><Pencil className="h-4 w-4 mr-1" />Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeletingId(a.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="hidden md:block border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead><TableHead>Date</TableHead>
                    <TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {a.important && <AlertCircle className="h-4 w-4 text-destructive" />}
                          {a.title}
                        </div>
                      </TableCell>
                      <TableCell>{a.date}</TableCell>
                      <TableCell>
                        {a.important ? <Badge variant="destructive">Important</Badge> : <Badge variant="secondary">Normal</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(a)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeletingId(a.id)}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      <Dialog open={!!editingAnnouncement} onOpenChange={() => { setEditingAnnouncement(null); resetForm(); }}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Announcement</DialogTitle><DialogDescription>Update the announcement details</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div><Label htmlFor="edit-title">Title</Label><Input id="edit-title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
            <div><Label htmlFor="edit-content">Content</Label><Textarea id="edit-content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={5} /></div>
            <div className="flex items-center space-x-2">
              <Switch id="edit-important" checked={formData.important} onCheckedChange={(checked) => setFormData({ ...formData, important: checked })} />
              <Label htmlFor="edit-important">Mark as important</Label>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2"><Button onClick={handleUpdate} disabled={updateA.isPending} className="w-full sm:w-auto">{updateA.isPending ? "Updating..." : "Update Announcement"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the announcement.</AlertDialogDescription>
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

export default AdminAnnouncements;
