import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle } from "lucide-react";
import announcementsData from "@/data/announcements.json";

const LMSAnnouncements = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">Stay updated with latest news</p>
      </div>

      <div className="space-y-4">
        {announcementsData.map((announcement) => (
          <Card key={announcement.id} className={announcement.important ? "border-primary" : ""}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {announcement.important && (
                    <AlertCircle className="w-5 h-5 text-primary" />
                  )}
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                </div>
                {announcement.important && (
                  <Badge variant="destructive">Important</Badge>
                )}
              </div>
              
              <p className="text-muted-foreground mb-3">{announcement.content}</p>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(announcement.date).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LMSAnnouncements;
