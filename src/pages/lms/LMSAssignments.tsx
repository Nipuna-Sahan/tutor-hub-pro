import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNotifications } from "@/contexts/NotificationContext";
import { useAssignments, useSubmitAssignment } from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";

const LMSAssignments = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const { data: assignments = [], isLoading, error } = useAssignments();
  const submitAssignment = useSubmitAssignment();

  const handleSubmit = async (assignmentId: string) => {
    if (!selectedFile) {
      toast.error("Please upload a file");
      return;
    }
    try {
      await submitAssignment.mutateAsync({ id: assignmentId, file: selectedFile, notes });
      toast.success("Assignment submitted successfully");

      addNotification({
        type: "assignment",
        title: "Assignment Submitted",
        message: "Your assignment has been successfully submitted for review.",
        date: new Date().toISOString(),
        link: "/lms/assignments"
      });

      setOpen(null);
      setSelectedFile(null);
      setNotes("");
    } catch (err) {
      toast.error((err as Error).message || "Failed to submit");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
      submitted: { variant: "default" as const, icon: CheckCircle2, label: "Submitted" },
      overdue: { variant: "destructive" as const, icon: AlertCircle, label: "Overdue" }
    };
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">Submit your assignments</p>
      </div>

      <div className="grid gap-4">
        {assignments.map(assignment => (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{assignment.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{assignment.description}</p>
                </div>
                {getStatusBadge(assignment.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Subject:</span> {assignment.subject}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Due Date:</span> {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                  {assignment.submittedDate && (
                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(assignment.submittedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                {assignment.status === "pending" && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button>Submit Assignment</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Submit Assignment</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Upload File</Label>
                          <FileUpload
                            accept=".pdf,.doc,.docx"
                            maxSize={5 * 1024 * 1024}
                            onFileSelect={setSelectedFile}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add any notes about your submission..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <Button onClick={handleSubmit} className="w-full">
                          Submit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LMSAssignments;
