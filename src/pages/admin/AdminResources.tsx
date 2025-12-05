import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/FileUpload";
import resourcesData from "@/data/resources.json";

const AdminResources = () => {
  const [resources, setResources] = useState(resourcesData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "notes",
    grade: "",
    description: "",
    downloadUrl: "",
  });

  const resetForm = () => {
    setFormData({ title: "", category: "notes", grade: "", description: "", downloadUrl: "" });
    setSelectedFile(null);
  };

  const handleAdd = () => {
    const newResource = {
      id: `resource-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      grade: formData.grade,
      description: formData.description,
      downloadUrl: formData.downloadUrl || "#",
      uploadDate: new Date().toISOString().split("T")[0],
    };
    setResources([...resources, newResource]);
    setIsAddOpen(false);
    resetForm();
    toast({ title: "Resource added successfully" });
  };

  const handleEdit = (resource: any) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      category: resource.category,
      grade: resource.grade,
      description: resource.description,
      downloadUrl: resource.downloadUrl,
    });
  };

  const handleUpdate = () => {
    const updatedResources = resources.map(r =>
      r.id === editingResource.id
        ? { ...r, title: formData.title, category: formData.category, grade: formData.grade, description: formData.description, downloadUrl: formData.downloadUrl || "#" }
        : r
    );
    setResources(updatedResources);
    setEditingResource(null);
    resetForm();
    toast({ title: "Resource updated successfully" });
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
    setDeletingId(null);
    toast({ title: "Resource deleted successfully" });
  };

  const getCategoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      notes: "bg-primary/20 text-primary border-primary/30",
      "past-papers": "bg-info/20 text-info border-info/30",
      "model-papers": "bg-accent/20 text-accent border-accent/30",
      "practical-guides": "bg-success/20 text-success border-success/30",
    };
    return <Badge className={styles[category] || ""}>{category}</Badge>;
  };

  const FormContent = () => (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="past-papers">Past Papers</SelectItem>
              <SelectItem value="model-papers">Model Papers</SelectItem>
              <SelectItem value="practical-guides">Practical Guides</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Grade</Label>
          <Input value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} placeholder="Grade 11" />
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>
      <div>
        <Label>Upload File</Label>
        <FileUpload accept=".pdf,.doc,.docx,.ppt,.pptx" maxSize={10 * 1024 * 1024} onFileSelect={setSelectedFile} value={selectedFile} />
      </div>
      <div>
        <Label>Download URL (Optional)</Label>
        <Input value={formData.downloadUrl} onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })} placeholder="https://..." />
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary to-accent shrink-0">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold font-display">Resources</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Manage study resources</p>
          </div>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <FormContent />
            <DialogFooter>
              <Button onClick={handleAdd} className="w-full sm:w-auto">Add Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-3 md:hidden">
        {resources.map((resource) => (
          <Card key={resource.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm truncate">{resource.title}</h3>
                  <p className="text-xs text-muted-foreground">{resource.grade} • {resource.uploadDate}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(resource.downloadUrl, "_blank")}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(resource)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeletingId(resource.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                {getCategoryBadge(resource.category)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Grade</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Date</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium max-w-[200px] truncate">{resource.title}</TableCell>
                    <TableCell>{getCategoryBadge(resource.category)}</TableCell>
                    <TableCell><Badge variant="outline">{resource.grade}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{resource.uploadDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(resource.downloadUrl, "_blank")}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(resource)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeletingId(resource.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
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

      {/* Edit Dialog */}
      <Dialog open={!!editingResource} onOpenChange={() => { setEditingResource(null); resetForm(); }}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          <FormContent />
          <DialogFooter>
            <Button onClick={handleUpdate} className="w-full sm:w-auto">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the resource.</AlertDialogDescription>
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

export default AdminResources;
