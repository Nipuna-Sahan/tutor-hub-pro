import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download, BookOpen, FileText, Video, Award } from "lucide-react";
import { Link } from "react-router-dom";

const StudyPacks = () => {
  const studyPacks = [
    {
      id: "complete-ol",
      title: "Complete O/L Study Pack",
      description: "Everything you need to ace your O/L Science examination",
      price: "Rs. 15,000",
      originalPrice: "Rs. 20,000",
      popular: true,
      features: [
        "All Past Papers (2015-2024)",
        "Comprehensive Study Notes",
        "Video Lesson Access (50+ hours)",
        "MCQ Practice Bank (1000+ questions)",
        "Model Papers with Answers",
        "Exam Tips & Strategies Guide",
        "Free Revision Classes Access",
        "WhatsApp Support Group"
      ],
      icon: Award,
      color: "from-primary to-primary-glow"
    },
    {
      id: "past-papers",
      title: "Past Papers Collection",
      description: "10 years of past papers with detailed marking schemes",
      price: "Rs. 5,000",
      originalPrice: "Rs. 7,500",
      popular: false,
      features: [
        "Past Papers (2015-2024)",
        "Detailed Marking Schemes",
        "Answer Keys with Explanations",
        "Topic-wise Organization",
        "Printable PDF Format",
        "Free Updates"
      ],
      icon: FileText,
      color: "from-accent to-accent-light"
    },
    {
      id: "video-course",
      title: "Video Learning Course",
      description: "Complete video course covering entire O/L syllabus",
      price: "Rs. 8,000",
      originalPrice: "Rs. 12,000",
      popular: false,
      features: [
        "50+ Hours of Video Content",
        "Topic-wise Organized",
        "HD Quality Videos",
        "Downloadable Resources",
        "Practice Questions",
        "Lifetime Access",
        "Mobile & Desktop Viewing"
      ],
      icon: Video,
      color: "from-secondary to-secondary-light"
    },
    {
      id: "revision-notes",
      title: "Revision Notes Bundle",
      description: "Concise and comprehensive notes for quick revision",
      price: "Rs. 3,500",
      originalPrice: "Rs. 5,000",
      popular: false,
      features: [
        "Complete Syllabus Coverage",
        "Color-coded Diagrams",
        "Key Points Highlighted",
        "Memory Tricks & Mnemonics",
        "Chapter Summaries",
        "Formula Sheets",
        "Printable Format"
      ],
      icon: BookOpen,
      color: "from-primary-light to-primary"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <Badge className="mb-4 text-sm px-4 py-1">Study Materials</Badge>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Premium Study Packs
              </h1>
              <p className="text-xl text-muted-foreground">
                Carefully curated study materials to boost your exam preparation
              </p>
            </div>
          </div>
        </section>

        {/* Study Packs Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {studyPacks.map((pack, index) => {
                const Icon = pack.icon;
                return (
                  <Card 
                    key={pack.id} 
                    className={`relative overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in ${
                      pack.popular ? 'border-2 border-primary' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {pack.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pack.color} flex items-center justify-center mb-4 float`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-display">{pack.title}</CardTitle>
                      <CardDescription className="text-base">{pack.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-4xl font-bold font-display">{pack.price}</span>
                          <span className="text-lg text-muted-foreground line-through">{pack.originalPrice}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Save {Math.round((1 - parseInt(pack.price.replace(/[^0-9]/g, '')) / parseInt(pack.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%
                        </Badge>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {pack.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="flex gap-3">
                      <Button className="flex-1 hover-lift" asChild>
                        <Link to="/payment">
                          <Download className="w-4 h-4 mr-2" />
                          Purchase Now
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact">Contact Us</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
          <div className="container mx-auto px-4">
            <Card className="glass-card border-0 shadow-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-display font-bold mb-4">Need a Custom Pack?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We can create customized study packs tailored to your specific needs and requirements
                </p>
                <Button size="lg" className="hover-lift" asChild>
                  <Link to="/contact">Contact Us for Custom Packs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StudyPacks;
