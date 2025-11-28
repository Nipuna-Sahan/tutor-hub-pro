import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ProgressReportProps {
  student: {
    name: string;
    id: string;
    grade: string;
    class: string;
  };
  marks: Array<{
    paperName: string;
    date: string;
    score: number;
    totalMarks: number;
    rank: number;
  }>;
  stats: {
    totalPapers: number;
    averageScore: number;
    attendance: number;
    highestScore: number;
    lowestScore: number;
  };
}

export function ProgressReport({ student, marks, stats }: ProgressReportProps) {
  const { toast } = useToast();

  const generatePDF = async () => {
    try {
      toast({
        title: "Generating Report",
        description: "Please wait while we prepare your PDF...",
      });

      const reportElement = document.getElementById("progress-report-content");
      if (!reportElement) return;

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save(`${student.name.replace(/\s/g, "_")}_Progress_Report.pdf`);

      toast({
        title: "Report Downloaded",
        description: "Your progress report has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Progress Report</CardTitle>
          <Button onClick={generatePDF} variant="default">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div id="progress-report-content" className="space-y-6 p-6 bg-background">
          {/* Header */}
          <div className="text-center space-y-2 pb-4 border-b">
            <h1 className="text-3xl font-bold">Student Progress Report</h1>
            <p className="text-muted-foreground">Academic Performance Summary</p>
          </div>

          {/* Student Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Student Name</p>
              <p className="font-semibold">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Student ID</p>
              <p className="font-semibold">{student.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grade</p>
              <p className="font-semibold">{student.grade}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="font-semibold">{student.class}</p>
            </div>
          </div>

          {/* Performance Statistics */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Performance Overview</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Total Papers</p>
                <p className="text-2xl font-bold">{stats.totalPapers}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Average Score</p>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                <p className="text-2xl font-bold">{stats.attendance}%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Highest Score</p>
                <p className="text-2xl font-bold">{stats.highestScore}%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Lowest Score</p>
                <p className="text-2xl font-bold">{stats.lowestScore}%</p>
              </div>
            </div>
          </div>

          {/* Recent Performance */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Recent Papers</h3>
            <div className="space-y-2">
              {marks.slice(0, 5).map((mark, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted"
                >
                  <div className="flex-1">
                    <p className="font-medium">{mark.paperName}</p>
                    <p className="text-sm text-muted-foreground">{mark.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {mark.score}/{mark.totalMarks}
                    </p>
                    <p className="text-sm text-muted-foreground">Rank: {mark.rank}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t text-center text-sm text-muted-foreground">
            <p>Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
