import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, FileText, CheckSquare, Calendar, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import videosData from "@/data/videos.json";
import resourcesData from "@/data/resources.json";
import announcementsData from "@/data/announcements.json";
import marksData from "@/data/marks.json";

const LMSDashboard = () => {
  const studentId = "std-001"; // Mock student ID
  const studentMarks = marksData.filter(m => m.studentId === studentId);
  const avgScore = studentMarks.length > 0 
    ? Math.round(studentMarks.reduce((acc, m) => acc + m.score, 0) / studentMarks.length)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Video Lessons</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videosData.length}</div>
            <p className="text-xs text-muted-foreground">Available to watch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resourcesData.length}</div>
            <p className="text-xs text-muted-foreground">Available downloads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Papers Done</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentMarks.length}</div>
            <p className="text-xs text-muted-foreground">Completed tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/lms/videos">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Video className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">Watch Videos</h3>
              <p className="text-sm text-muted-foreground">Latest lessons available</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/lms/resources">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">Download Resources</h3>
              <p className="text-sm text-muted-foreground">Notes and past papers</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/lms/performance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">View Performance</h3>
              <p className="text-sm text-muted-foreground">Track your progress</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcementsData.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-primary pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold">{announcement.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{announcement.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSDashboard;
