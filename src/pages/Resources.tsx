import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Calendar } from "lucide-react";
import resourcesData from "@/data/resources.json";

const Resources = () => {
  const categories = [
    { id: "notes", label: "Notes" },
    { id: "past-papers", label: "Past Papers" },
    { id: "model-papers", label: "Model Papers" },
    { id: "practical-guides", label: "Practical Guides" }
  ];

  const getResourcesByCategory = (category: string) => {
    return resourcesData.filter(r => r.category === category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Study Resources
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              Download notes, past papers, and study materials
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="notes">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
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
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Resources;
