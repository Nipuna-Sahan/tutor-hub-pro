import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Calendar } from "lucide-react";

interface ProgressTrackerProps {
  pendingPapers: number;
  weeklyTasks: { task: string; completed: boolean }[];
  attendance: number;
}

export const ProgressTracker = ({ pendingPapers, weeklyTasks, attendance }: ProgressTrackerProps) => {
  const completedTasks = weeklyTasks.filter(t => t.completed).length;
  const taskProgress = (completedTasks / weeklyTasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5" />
            Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Attendance</span>
              <span className="font-semibold">{attendance}%</span>
            </div>
            <Progress value={attendance} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Pending Papers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5" />
            Pending Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-primary mb-2">{pendingPapers}</div>
            <p className="text-sm text-muted-foreground">Papers to Complete</p>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="w-5 h-5" />
            Weekly Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-semibold">{completedTasks}/{weeklyTasks.length}</span>
            </div>
            <Progress value={taskProgress} className="h-2 mb-4" />
            
            <div className="space-y-2">
              {weeklyTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle 
                    className={`w-4 h-4 ${task.completed ? 'text-success' : 'text-muted-foreground'}`}
                  />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
