import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye, Video, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import videosData from "@/data/videos.json";

const LMSVideos = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-info/10 via-primary/5 to-background p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-info/20 to-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-info to-info/70 flex items-center justify-center shadow-lg">
            <Video className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Video Lessons</h1>
            <p className="text-muted-foreground">Watch recorded class sessions and learn at your own pace</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-display text-primary">{videosData.length}</div>
            <div className="text-xs text-muted-foreground">Total Videos</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-display text-info">
              {videosData.reduce((acc, v) => acc + parseInt(v.duration), 0)}+
            </div>
            <div className="text-xs text-muted-foreground">Minutes Content</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-display text-success">
              {new Set(videosData.map(v => v.subject)).size}
            </div>
            <div className="text-xs text-muted-foreground">Subjects</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-display text-accent">
              {videosData.reduce((acc, v) => acc + (v.views || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videosData.map((video, index) => (
          <Card 
            key={video.id} 
            className="group hover-lift border-border/50 overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-0">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                    <Play className="w-7 h-7 text-primary group-hover:text-white ml-1" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/70 text-white text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
                {/* New Badge */}
                {index < 2 && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary shadow-md">
                      <Sparkles className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Video Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold font-display line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
                
                <Badge variant="secondary" className="text-xs">
                  {video.subject}
                </Badge>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    {video.views} views
                  </div>
                  <Button size="sm" variant="ghost" className="group/btn text-primary hover:text-primary hover:bg-primary/10">
                    <PlayCircle className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                    Watch
                  </Button>
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
