import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Trophy, BookOpen, Users, Star, Sparkles, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";
import tutorData from "@/data/tutor.json";
import announcementsData from "@/data/announcements.json";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Modern with Floating Elements */}
      <section className="relative bg-gradient-hero py-24 lg:py-32 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-light/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Excellence in Science Education</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Welcome to{" "}
                <span className="block mt-2 gradient-text font-display">
                  {tutorData.name}'s
                </span>
                <span className="block mt-2 text-4xl lg:text-5xl">Science Classes</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {tutorData.bio}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/classes/ol-revision-2025">
                  <Button size="lg" className="text-lg px-8 py-6 shadow-glow hover:shadow-accent-glow transition-all duration-300 hover:scale-105">
                    Join 2025 O/L Revision
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:bg-primary/5 hover:scale-105 transition-all duration-300">
                    View All Classes
                  </Button>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary font-display">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-accent font-display">500+</div>
                  <div className="text-sm text-muted-foreground">Students Taught</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-success font-display">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-30 animate-pulse-glow" />
                <img 
                  src={tutorData.photo} 
                  alt={tutorData.name}
                  className="relative rounded-3xl shadow-2xl w-full max-w-lg hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold font-display">Best Tutor</div>
                      <div className="text-sm text-muted-foreground">2023 Award</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section - Glassmorphism Cards */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Qualifications & Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Backed by excellence, driven by passion for teaching
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tutorData.achievements.map((achievement, index) => {
              const Icon = achievement.icon === "GraduationCap" ? GraduationCap :
                          achievement.icon === "Award" ? Award : Trophy;
              return (
                <Card key={index} className="glass-card hover-lift hover-glow border-border/50 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-8 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-6 bg-gradient-primary rounded-2xl shadow-glow">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-2xl font-display">{achievement.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section - Modern Stats */}
      <section className="py-24 bg-gradient-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-4">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Outstanding Performance</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              O/L Results That Speak
            </h2>
            <p className="text-lg text-muted-foreground">
              {tutorData.results.year} O/L Science Results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="glass-card border-success/30 hover-lift hover:shadow-success/20 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-10 pb-10 text-center space-y-4">
                <div className="text-7xl font-bold bg-gradient-to-br from-success to-success/70 bg-clip-text text-transparent font-display">
                  {tutorData.results.grades.A}
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">Students Got A</p>
                  <div className="h-2 w-20 bg-success/20 rounded-full mx-auto overflow-hidden">
                    <div className="h-full w-3/4 bg-success rounded-full animate-shimmer" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-info/30 hover-lift hover:shadow-info/20 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-10 pb-10 text-center space-y-4">
                <div className="text-7xl font-bold bg-gradient-to-br from-info to-info/70 bg-clip-text text-transparent font-display">
                  {tutorData.results.grades.B}
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">Students Got B</p>
                  <div className="h-2 w-20 bg-info/20 rounded-full mx-auto overflow-hidden">
                    <div className="h-full w-2/3 bg-info rounded-full animate-shimmer" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-warning/30 hover-lift hover:shadow-warning/20 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="pt-10 pb-10 text-center space-y-4">
                <div className="text-7xl font-bold bg-gradient-to-br from-warning to-warning/70 bg-clip-text text-transparent font-display">
                  {tutorData.results.grades.C}
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">Students Got C</p>
                  <div className="h-2 w-20 bg-warning/20 rounded-full mx-auto overflow-hidden">
                    <div className="h-full w-1/2 bg-warning rounded-full animate-shimmer" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teaching Style Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Student-Centered Approach</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              My Teaching Philosophy
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {tutorData.teachingStyle}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Interactive Learning", desc: "Engaging lessons with practical demonstrations and hands-on experiments", color: "primary" },
              { icon: Users, title: "Small Batches", desc: "Personalized attention for every student in intimate learning groups", color: "accent" },
              { icon: Star, title: "Proven Results", desc: "Track record of excellent O/L performances year after year", color: "success" }
            ].map((item, index) => (
              <Card key={index} className="glass-card hover-lift border-border/50 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className={`p-5 bg-${item.color}/10 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-12 h-12 text-${item.color}`} />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl font-display">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Design */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Student Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from students who achieved their dreams
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tutorData.testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover-lift border-border/50 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary" />
                    <div>
                      <p className="font-semibold font-display">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.grade}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements - Clean Modern */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Latest Announcements
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest news and updates
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {announcementsData.slice(0, 3).map((announcement, index) => (
              <Card 
                key={announcement.id} 
                className={`glass-card hover-lift border-border/50 ${announcement.important ? 'border-primary/50 shadow-glow' : ''} animate-slide-in-left`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        {announcement.important && (
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                            Important
                          </span>
                        )}
                        <h3 className="font-bold text-xl font-display">{announcement.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Gradient */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-95" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold text-white font-display">
              Ready to Excel in Science?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join hundreds of successful students and start your journey to O/L excellence today
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/classes">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-xl">
                  Explore Classes
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
