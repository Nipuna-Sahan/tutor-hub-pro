import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Award, Trophy, BookOpen, Users, Star, Sparkles, TrendingUp, Target, Calendar, Clock, CheckCircle2, ArrowRight, Play, Send, MessageSquare, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import tutorData from "@/data/tutor.json";
import announcementsData from "@/data/announcements.json";
import classesData from "@/data/classes.json";

const Home = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [counts, setCounts] = useState({ students: 0, experience: 0, success: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    // Update button visibility
    const handlePlay = () => setIsPlaying(true);
    const handlePauseOrEnd = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePauseOrEnd);
    video.addEventListener("ended", handlePauseOrEnd);

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Auto-play only if user already clicked play
          if (!video.paused && !video.ended) {
            video.play();
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 } // 50% visibility triggers
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePauseOrEnd);
      video.removeEventListener("ended", handlePauseOrEnd);
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (!hasAnimated) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      const targets = { students: 500, experience: 5, success: 95 };
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          students: Math.floor(targets.students * progress),
          experience: Math.floor(targets.experience * progress),
          success: Math.floor(targets.success * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounts(targets);
          setHasAnimated(true);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [hasAnimated]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive updates about new classes and announcements.",
      });
      setEmail("");
    }
  };

  const featuredClasses = classesData.slice(0, 3);

  const faqs = [
    {
      question: "What grades do you teach?",
      answer: "I specialize in teaching Science for O/L students (Grades 10-11). My comprehensive program covers the entire O/L Science syllabus with a focus on practical understanding and exam preparation."
    },
    {
      question: "What is your teaching methodology?",
      answer: "I believe in interactive learning with practical demonstrations, personalized attention in small batches, and regular assessments. Each concept is explained with real-world applications to ensure deep understanding."
    },
    // {
    //   question: "How many students are in each batch?",
    //   answer: "I maintain small batch sizes of 15-20 students to ensure every student receives personalized attention and can clarify their doubts effectively."
    // },
    {
      question: "Do you provide study materials?",
      answer: "Yes! All students receive comprehensive study materials including notes, past papers, practice questions, and access to recorded video lessons through our online portal."
    },
    {
      question: "How can I track my child's progress?",
      answer: "Parents and students have access to our online portal where you can view attendance, marks, past paper results, and detailed performance analytics. We also provide regular progress reports."
    }
  ];

  const learningProcess = [
    { step: 1, title: "Enroll", desc: "Join the class that fits your schedule", icon: CheckCircle2 },
    { step: 2, title: "Learn", desc: "Interactive lessons with practical demos", icon: BookOpen },
    { step: 3, title: "Practice", desc: "Complete assignments & past papers", icon: Target },
    { step: 4, title: "Excel", desc: "Achieve excellence in your O/L exam", icon: Trophy }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Video Background Overlay */}
      <section className="relative bg-gradient-hero py-24 lg:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-light/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Excellence in Science Education Since 2017</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Transform Your{" "}
                <span className="block mt-2 gradient-text font-display">
                  Science Journey
                </span>
                <span className="block mt-2 text-4xl lg:text-5xl">with {tutorData.name}</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Join Sri Lanka's most successful Science tuition program. Experience interactive learning, personalized attention, and proven results that speak for themselves.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/classes">
                  <Button size="lg" className="text-lg px-8 py-6 shadow-glow hover:shadow-accent-glow transition-all duration-300 hover:scale-105 group">
                    Explore Classes
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 hover:bg-primary/5 hover:scale-105 transition-all duration-300 group"
                  onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Animated Stats Bar */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary font-display">{counts.experience}+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent font-display">{counts.students}+</div>
                  <div className="text-sm text-muted-foreground">Students Taught</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-success font-display">{counts.success}%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
            
            <div 
            ref={containerRef}
            className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-30 animate-pulse-glow" />
                {/* <img 
                  src={tutorData.photo} 
                  alt={tutorData.name}
                  className="relative rounded-3xl shadow-2xl w-full max-w-lg hover:scale-105 transition-transform duration-500"
                /> */}
                 {/* Video */}
                  <video
                    ref={videoRef}
                    src={tutorData.video}
                    className="relative rounded-3xl shadow-2xl w-[70vh] h-[70vh] max-w-lg object-cover"
                    //muted
                    playsInline
                  />

        {/* Custom Play Button */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30 shadow-xl hover:scale-110 transition-transform">
              <Play className="w-10 h-10 text-white" />
            </div>
          </button>
        )}
                {/* Floating Achievement Badge */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl animate-float shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold font-display">Best Science Teacher</div>
                      {/* <div className="text-sm text-muted-foreground">2023 Excellence</div> */}
                    </div>
                  </div>
                </div>
                {/* Floating Success Rate */}
                <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl animate-float shadow-xl" style={{ animationDelay: '1s' }}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success font-display">95%</div>
                    <div className="text-xs text-muted-foreground">A & B Grades</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classes Section */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="px-4 py-2 text-sm">Popular Classes</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Featured Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed for O/L success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredClasses.map((classItem, index) => (
              <Card key={classItem.id} className="glass-card hover-lift border-border/50 group animate-scale-in overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {classItem.grade}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary font-display">{classItem.fees.monthly}</div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{classItem.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{classItem.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{classItem.timetable[0]?.day} - {classItem.timetable[0]?.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{classItem.timetable.length} {classItem.timetable.length > 1 ? 'sessions' : 'session'} per week</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Small batch (Max 20 students)</span>
                    </div>
                  </div>
                  <Link to={`/classes/${classItem.id}`}>
                    <Button className="w-full group/btn">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/classes">
              <Button size="lg" variant="outline" className="group">
                View All Classes
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="px-4 py-2 text-sm">Simple Process</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Your Path to Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform your Science grades
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success opacity-20" />
            
            {learningProcess.map((item, index) => (
              <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="glass-card hover-lift text-center group">
                  <CardContent className="pt-8 space-y-4">
                    <div className="flex justify-center relative">
                      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="font-bold text-xl font-display">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section with Progress Bars */}
      <section className="py-24 bg-gradient-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="px-4 py-2 text-sm bg-success/10 text-success border-success/20">
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              Outstanding Performance
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Results That Speak Volumes
            </h2>
            <p className="text-lg text-muted-foreground">
              {tutorData.results.year} O/L Science Achievement Breakdown
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Grade A */}
            <Card className="glass-card hover-lift border-success/30 animate-slide-in-left">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-success to-success/70 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold text-white">A</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-display">Grade A Students</h3>
                      <p className="text-muted-foreground">Excellent Performance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-success font-display">{tutorData.results.grades.A}</div>
                    <div className="text-sm text-muted-foreground">students</div>
                  </div>
                </div>
                <Progress value={65} className="h-3" />
              </CardContent>
            </Card>

            {/* Grade B */}
            <Card className="glass-card hover-lift border-info/30 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-info to-info/70 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold text-white">B</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-display">Grade B Students</h3>
                      <p className="text-muted-foreground">Very Good Performance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-info font-display">{tutorData.results.grades.B}</div>
                    <div className="text-sm text-muted-foreground">students</div>
                  </div>
                </div>
                <Progress value={28} className="h-3" />
              </CardContent>
            </Card>

            {/* Grade C */}
            <Card className="glass-card hover-lift border-warning/30 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-warning to-warning/70 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold text-white">C</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-display">Grade C Students</h3>
                      <p className="text-muted-foreground">Good Performance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-warning font-display">{tutorData.results.grades.C}</div>
                    <div className="text-sm text-muted-foreground">students</div>
                  </div>
                </div>
                <Progress value={7} className="h-3" />
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="glass-card max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-4 text-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <span className="font-semibold">100% Pass Rate</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-semibold text-success">93% A & B Grades</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="px-4 py-2 text-sm">Credentials</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Qualifications & Recognition
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Excellence backed by credentials and proven track record
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tutorData.achievements.map((achievement, index) => {
              const Icon = achievement.icon === "GraduationCap" ? GraduationCap :
                          achievement.icon === "Award" ? Award : Trophy;
              return (
                <Card key={index} className="glass-card hover-lift hover-glow border-border/50 animate-scale-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-8 text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="p-6 bg-gradient-primary rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-2xl font-display group-hover:text-primary transition-colors">{achievement.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      {/* Teaching Methodology */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <Badge className="px-4 py-2 text-sm">
                <Target className="w-4 h-4 mr-2 inline" />
                Teaching Excellence
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-display">
                Student-Centered Learning Approach
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {tutorData.teachingStyle}
              </p>

              <div className="space-y-4">
                {[
                  { icon: BookOpen, title: "Interactive Sessions", desc: "Practical demonstrations and real-world applications" },
                  //{ icon: Users, title: "Small Batch Sizes", desc: "Maximum 20 students for personalized attention" },
                  { icon: Zap, title: "Regular Assessments", desc: "Weekly tests and monthly progress tracking" },
                  { icon: Star, title: "Comprehensive Materials", desc: "Notes, videos, and practice papers included" }
                ].map((item, index) => (
                  <Card key={index} className="glass-card hover-lift border-border/50 group">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold font-display mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-right" id="demo-video">
              <div className="aspect-video rounded-3xl bg-gradient-primary flex items-center justify-center relative overflow-hidden shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-white font-semibold text-lg">Watch Teaching Demo</p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-8 left-8 glass-card p-4 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-bold font-display">Live Q&A</div>
                    <div className="text-xs text-muted-foreground">Every Session</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="px-4 py-2 text-sm">Student Reviews</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from students who transformed their grades
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tutorData.testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover-lift border-border/50 animate-scale-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-foreground leading-relaxed">
                    <span className="text-4xl text-primary/20 font-serif">"</span>
                    {testimonial.text}
                    <span className="text-4xl text-primary/20 font-serif">"</span>
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold font-display">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.grade}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="px-4 py-2 text-sm">FAQs</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our classes
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="glass-card border-border/50 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 hover:no-underline hover:bg-primary/5 transition-colors">
                      <span className="font-bold font-display text-left">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Badge className="px-4 py-2 text-sm">Updates</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Latest Announcements
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed about class updates and important dates
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {announcementsData.slice(0, 3).map((announcement, index) => (
              <Card 
                key={announcement.id} 
                className={`glass-card hover-lift border-border/50 ${announcement.important ? 'border-primary/50 shadow-glow' : ''} animate-slide-in-left group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {announcement.important && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Important
                          </Badge>
                        )}
                        <h3 className="font-bold text-xl font-display group-hover:text-primary transition-colors">{announcement.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {new Date(announcement.date).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <Card className="glass-card max-w-4xl mx-auto border-primary/20 shadow-glow">
            <CardContent className="pt-12 pb-12 text-center space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display">
                  Stay Updated
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Subscribe to our newsletter for class updates, study tips, and exclusive resources
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 rounded-xl"
                />
                <Button type="submit" size="lg" className="group">
                  Subscribe
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <p className="text-sm text-muted-foreground">
                Join 500+ students receiving weekly updates. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-95" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <div className="max-w-3xl mx-auto space-y-8">
            <Badge className="px-4 py-2 text-sm bg-white/20 text-white border-white/30">
              Limited Seats Available
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-white font-display">
              Ready to Transform Your Science Grades?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join our proven program and experience the difference that personalized attention and expert teaching can make
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/classes">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 hover:scale-105 transition-all duration-300 shadow-xl group">
                  Enroll Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 py-6 bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Proven Results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Small Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Expert Teacher</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
