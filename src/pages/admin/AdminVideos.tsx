import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Play, Pencil, Trash2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import videosData from "@/data/videos.json";

const AdminVideos = () => {
  const [videos, setVideos] = useState(videosData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<typeof videosData[0] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    grade: "",
    subject: "",
  });

  const resetForm = () => {
    setFormData({ title: "", description: "", videoUrl: "", duration: "", grade: "", subject: "" });
  };

  const handleAdd = () => {
    const newVideo = {
      id: `vid-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      videoUrl: formData.videoUrl,
      duration: formData.duration,
      grade: formData.grade,
      subject: formData.subject,
      thumbnailUrl: "/placeholder.svg",
      uploadDate: new Date().toISOString().split("T")[0],
      views: 0,
    };
    setVideos([...videos, newVideo]);
    setIsAddOpen(false);
    resetForm();
    toast({ title: "Video added successfully" });
  };

  const handleEdit = (video: typeof videosData[0]) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      duration: video.duration,
      grade: video.grade,
      subject: video.subject,
    });
  };

  const handleUpdate = () => {
    if (!editingVideo) return;
    setVideos(videos.map(v => v.id === editingVideo.id ? { ...v, ...formData } : v));
    setEditingVideo(null);
    resetForm();
    toast({ title: "Video updated successfully" });
  };

  const handleDelete = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
    setDeletingId(null);
    toast({ title: "Video deleted successfully" });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl md:text-3xl font-bold font-display">Videos</h1>
          <p className="text-sm text-muted-foreground">Upload and manage video lessons</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Video</DialogTitle>
              <DialogDescription>Add a new video lesson</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} /></div>
              <div><Label>Video URL</Label><Input value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} placeholder="https://youtube.com/..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Duration</Label><Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="45:30" /></div>
                <div><Label>Subject</Label><Input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} /></div>
              </div>
              <div><Label>Grade</Label><Input value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} placeholder="Grade 10-11" /></div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2"><Button onClick={handleAdd} className="w-full sm:w-auto">Add Video</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="border-border/50 overflow-hidden group hover:shadow-lg transition-all">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-primary ml-1" />
              </div>
              <Badge className="absolute top-2 right-2 text-xs"><Clock className="w-3 h-3 mr-1" />{video.duration}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1">{video.title}</h3>
              <Badge variant="secondary" className="text-xs mb-2">{video.subject}</Badge>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">{video.uploadDate}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(video)}><Pencil className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => setDeletingId(video.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editingVideo} onOpenChange={() => { setEditingVideo(null); resetForm(); }}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Video</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} /></div>
            <div><Label>Video URL</Label><Input value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Duration</Label><Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} /></div>
              <div><Label>Subject</Label><Input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} /></div>
            </div>
            <div><Label>Grade</Label><Input value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} /></div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2"><Button onClick={handleUpdate} className="w-full sm:w-auto">Update Video</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
          <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the video.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletingId && handleDelete(deletingId)} className="w-full sm:w-auto">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminVideos;