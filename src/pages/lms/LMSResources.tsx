import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, FolderOpen, BookOpen, File, Sparkles } from "lucide-react";
import resourcesData from "@/data/resources.json";

const LMSResources = () => {
  const categories = [
    { id: "notes", label: "Notes", icon: BookOpen, color: "text-primary" },
    { id: "past-papers", label: "Past Papers", icon: FileText, color: "text-accent" },
    { id: "model-papers", label: "Model Papers", icon: File, color: "text-info" },
    { id: "practical-guides", label: "Guides", icon: FolderOpen, color: "text-success" }
  ];

  const getResourcesByCategory = (category: string) => {
    return resourcesData.filter(r => r.category === category);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 via-primary/5 to-background p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
            <FolderOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Study Resources</h1>
            <p className="text-muted-foreground">Download notes, past papers, and study materials</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const count = getResourcesByCategory(cat.id).length;
          const Icon = cat.icon;
          return (
            <Card key={cat.id} className="border-border/50 group hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-display">{count}</div>
                    <div className="text-xs text-muted-foreground">{cat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-2xl">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
              >
                <Icon className={`w-4 h-4 ${cat.color}`} />
                <span className="hidden sm:inline">{cat.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="mt-6 space-y-4">
            {getResourcesByCategory(cat.id).length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <cat.icon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold font-display text-lg mb-2">No {cat.label} Available</h3>
                  <p className="text-muted-foreground">Check back later for new resources</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {getResourcesByCategory(cat.id).map((resource, index) => (
                  <Card 
                    key={resource.id} 
                    className="group hover-lift border-border/50 overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${cat.color.replace('text-', '')}/20 to-${cat.color.replace('text-', '')}/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <cat.icon className={`w-7 h-7 ${cat.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold font-display group-hover:text-primary transition-colors">
                              {resource.title}
                            </h3>
                            {index < 2 && (
                              <Badge className="shrink-0 bg-primary/10 text-primary border-primary/20">
                                <Sparkles className="w-3 h-3 mr-1" />
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {resource.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                            <Badge variant="secondary" className="text-xs">
                              {resource.grade}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(resource.uploadDate).toLocaleDateString()}
                            </div>
                          </div>
                          <Button size="sm" className="w-full group/btn">
                            <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LMSResources;
