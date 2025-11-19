import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp, Award } from "lucide-react";

interface PerformanceSummaryProps {
  totalPapers: number;
  averageScore: number;
  badges: string[];
}

export const PerformanceSummary = ({ totalPapers, averageScore, badges }: PerformanceSummaryProps) => {
  const getPerformanceLevel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-success" };
    if (score >= 70) return { label: "Very Good", color: "bg-info" };
    if (score >= 60) return { label: "Good", color: "bg-warning" };
    return { label: "Needs Improvement", color: "bg-destructive" };
  };

  const performance = getPerformanceLevel(averageScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Performance Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{totalPapers}</div>
              <p className="text-xs text-muted-foreground">Papers Done</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
          </div>

          {/* Performance Level */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance Level</span>
              <Badge className={performance.color}>{performance.label}</Badge>
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Achievements</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.length > 0 ? (
                badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {badge}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete more papers to earn badges!
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
