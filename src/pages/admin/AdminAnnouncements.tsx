import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import announcementsData from "@/data/announcements.json";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    important: false,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      important: false,
    });
  };

  const handleAdd = () => {
    const newAnnouncement = {
      id: `ann-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
      important: formData.important,
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setIsAddOpen(false);
    resetForm();
    toast({ title: "Announcement created successfully" });
  };

  const handleEdit = (announcement: any) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      important: announcement.important,
    });
  };

  const handleUpdate = () => {
    const updatedAnnouncements = announcements.map(a =>
      a.id === editingAnnouncement.id
        ? {
            ...a,
            title: formData.title,
            content: formData.content,
            important: formData.important,
          }
        : a
    );

    setAnnouncements(updatedAnnouncements);
    setEditingAnnouncement(null);
    resetForm();
    toast({ title: "Announcement updated successfully" });
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    setDeletingId(null);
    toast({ title: "Announcement deleted successfully" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Announcements Management</h1>
          <p className="text-muted-foreground">Create and manage announcements</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>Publish a new announcement for students</DialogDescription>
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
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="important"
                  checked={formData.important}
                  onCheckedChange={(checked) => setFormData({ ...formData, important: checked })}
                />
                <Label htmlFor="important">Mark as important</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Create Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {announcement.important && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    {announcement.title}
                  </div>
                </TableCell>
                <TableCell>{announcement.date}</TableCell>
                <TableCell>
                  {announcement.important ? (
                    <Badge variant="destructive">Important</Badge>
                  ) : (
                    <Badge variant="secondary">Normal</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(announcement)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingId(announcement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingAnnouncement} onOpenChange={() => { setEditingAnnouncement(null); resetForm(); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>Update the announcement details</DialogDescription>
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
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={5}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-important"
                checked={formData.important}
                onCheckedChange={(checked) => setFormData({ ...formData, important: checked })}
              />
              <Label htmlFor="edit-important">Mark as important</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the announcement.
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

export default AdminAnnouncements;
