import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye } from "lucide-react";
import videosData from "@/data/videos.json";

const LMSVideos = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Video Lessons</h1>
        <p className="text-muted-foreground">Watch recorded class sessions</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videosData.map((video) => (
          <Card key={video.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <Play className="w-12 h-12 text-primary" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  <Badge variant="outline">{video.subject}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views} views
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LMSVideos;
