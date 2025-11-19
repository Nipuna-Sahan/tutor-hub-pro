import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from "lucide-react";
import resourcesData from "@/data/resources.json";

const LMSResources = () => {
  const categories = [
    { id: "notes", label: "Notes" },
    { id: "past-papers", label: "Past Papers" },
    { id: "model-papers", label: "Model Papers" },
    { id: "practical-guides", label: "Guides" }
  ];

  const getResourcesByCategory = (category: string) => {
    return resourcesData.filter(r => r.category === category);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Study Resources</h1>
        <p className="text-muted-foreground">Download notes and past papers</p>
      </div>

      <Tabs defaultValue="notes">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {getResourcesByCategory(cat.id).map(resource => (
                <Card key={resource.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="font-semibold">{resource.grade}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(resource.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LMSResources;
