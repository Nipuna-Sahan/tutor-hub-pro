import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Calendar, TrendingUp } from "lucide-react";

interface Paper {
  paperName: string;
  date: string;
  score: number;
  totalMarks: number;
  rank: number;
  feedback?: string;
}

interface PastPaperListProps {
  papers: Paper[];
}

const getGradeBadge = (percentage: number) => {
  if (percentage >= 75) return <Badge className="bg-success">A</Badge>;
  if (percentage >= 65) return <Badge className="bg-info">B</Badge>;
  if (percentage >= 50) return <Badge className="bg-warning">C</Badge>;
  return <Badge variant="destructive">S</Badge>;
};

export const PastPaperList = ({ papers }: PastPaperListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="w-5 h-5" />
          Completed Past Papers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {papers.map((paper, index) => {
            const percentage = (paper.score / paper.totalMarks) * 100;
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{paper.paperName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(paper.date).toLocaleDateString()}
                    </div>
                  </div>
                  {getGradeBadge(percentage)}
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{paper.score}/{paper.totalMarks}</span>
                    <span className="text-muted-foreground">({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <TrendingUp className="w-3 h-3" />
                    <span>Rank: {paper.rank}</span>
                  </div>
                </div>
                
                {paper.feedback && (
                  <p className="text-sm text-muted-foreground mt-2 italic">{paper.feedback}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
