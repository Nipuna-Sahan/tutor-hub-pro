import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle, Megaphone, Bell, Sparkles } from "lucide-react";
import announcementsData from "@/data/announcements.json";

const LMSAnnouncements = () => {
  const importantAnnouncements = announcementsData.filter(a => a.important);
  const regularAnnouncements = announcementsData.filter(a => !a.important);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-destructive/10 via-accent/5 to-background p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-destructive/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive to-destructive/70 flex items-center justify-center shadow-lg">
            <Megaphone className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Announcements</h1>
            <p className="text-muted-foreground">Stay updated with the latest news and updates</p>
          </div>
        </div>
      </div>

      {/* Important Announcements */}
      {importantAnnouncements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-bold font-display">Important</h2>
            <Badge variant="destructive" className="animate-pulse">
              {importantAnnouncements.length} New
            </Badge>
          </div>
          
          <div className="space-y-4">
            {importantAnnouncements.map((announcement, index) => (
              <Card 
                key={announcement.id} 
                className="relative overflow-hidden border-2 border-destructive/30 bg-gradient-to-r from-destructive/5 via-transparent to-transparent hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-destructive to-destructive/50" />
                <CardContent className="p-6 pl-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-destructive animate-bounce-subtle" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg font-display">{announcement.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(announcement.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    <Badge variant="destructive" className="shrink-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Important
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-13">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-bold font-display">All Announcements</h2>
        </div>
        
        <div className="grid gap-4">
          {regularAnnouncements.map((announcement, index) => (
            <Card 
              key={announcement.id} 
              className="group hover-lift border-border/50 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Megaphone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold font-display group-hover:text-primary transition-colors">
                        {announcement.title}
                      </h3>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(announcement.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {announcement.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {announcementsData.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Megaphone className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-bold font-display text-lg mb-2">No Announcements</h3>
            <p className="text-muted-foreground">Check back later for updates</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LMSAnnouncements;
