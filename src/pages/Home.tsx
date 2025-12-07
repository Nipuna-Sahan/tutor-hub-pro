import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Award, Trophy, BookOpen, Users, Star, Sparkles, TrendingUp, Target, Calendar, Clock, CheckCircle2, ArrowRight, Play, Send, MessageSquare, BarChart3, Zap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import tutorData from "@/data/tutor.json";
import announcementsData from "@/data/announcements.json";
import classesData from "@/data/classes.json";
import { motion } from "framer-motion";

const Home = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [counts, setCounts] = useState({ students: 0, experience: 0, success: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePauseOrEnd = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePauseOrEnd);
    video.addEventListener("ended", handlePauseOrEnd);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.paused && !video.ended) {
            video.play();
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-hero py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-primary-light/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-success/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-warning/5 rounded-full blur-xl animate-bounce-subtle" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 glass-card rounded-full mx-auto lg:mx-0">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-primary">Excellence in Science Education Since 2017</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Transform Your{" "}
                <span className="block mt-1 sm:mt-2 gradient-text font-display">
                  Science Journey
                </span>
                <span className="block mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">with {tutorData.name}</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join Sri Lanka's most successful Science tuition program. Experience interactive learning, personalized attention, and proven results that speak for themselves.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/classes">
                  <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-glow hover:shadow-accent-glow transition-all duration-300 hover:scale-105 group">
                    Explore Classes
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/5 hover:scale-105 transition-all duration-300 group"
                  onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Animated Stats Bar */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-border/50">
                <div className="text-center lg:text-left space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary font-display">{counts.experience}+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center lg:text-left space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent font-display">{counts.students}+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Students Taught</div>
                </div>
                <div className="text-center lg:text-left space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-success font-display">{counts.success}%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              ref={containerRef}
              className="flex justify-center order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-30 animate-pulse-glow" />
                <video
                  ref={videoRef}
                  src={tutorData.video}
                  className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full aspect-square object-cover"
                  playsInline
                />

                {/* Custom Play Button */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-full border border-white/30 shadow-xl hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </button>
                )}

                {/* Floating Achievement Badge */}
                <motion.div 
                  className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl hidden sm:block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold font-display text-sm sm:text-base">Best Science Teacher</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Success Rate */}
                <motion.div 
                  className="absolute -top-4 sm:-top-6 -right-2 sm:-right-6 glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl hidden sm:block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-success font-display">95%</div>
                    <div className="text-xs text-muted-foreground">A & B Grades</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Featured Classes Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Popular Classes</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
              Featured Programs
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed for O/L success
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card hover-lift border-border/50 group h-full overflow-hidden">
                  <CardHeader className="space-y-3 sm:space-y-4">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {classItem.grade}
                      </Badge>
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-primary font-display">{classItem.fees.monthly}</div>
                        <div className="text-xs text-muted-foreground">per month</div>
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg sm:text-xl">{classItem.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{classItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span>{classItem.timetable[0]?.day} - {classItem.timetable[0]?.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span>{classItem.timetable.length} {classItem.timetable.length > 1 ? 'sessions' : 'session'} per week</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
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
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Simple Process</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
              Your Path to Success
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform your Science grades
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {/* Connection Lines - Desktop */}
            <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success opacity-20" />
            
            {learningProcess.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card hover-lift text-center group h-full">
                  <CardContent className="pt-6 sm:pt-8 space-y-3 sm:space-y-4">
                    <div className="flex justify-center relative">
                      <div className="w-14 h-14 sm:w-16 lg:w-20 sm:h-16 lg:h-20 bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-7 h-7 sm:w-8 lg:w-10 sm:h-8 lg:h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl font-display">{item.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-success/10 text-success border-success/20">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2 inline" />
              Outstanding Performance
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
              Results That Speak Volumes
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {tutorData.results.year} O/L Science Achievement Breakdown
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Grade A */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card hover-lift border-success/30">
                <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-success to-success/70 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-xl sm:text-3xl font-bold text-white">A</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold font-display">Grade A Students</h3>
                        <p className="text-muted-foreground text-xs sm:text-base hidden sm:block">Excellent Performance</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-4xl font-bold text-success font-display">{tutorData.results.grades.A}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">students</div>
                    </div>
                  </div>
                  <Progress value={65} className="h-2 sm:h-3" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Grade B */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card hover-lift border-info/30">
                <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-info to-info/70 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-xl sm:text-3xl font-bold text-white">B</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold font-display">Grade B Students</h3>
                        <p className="text-muted-foreground text-xs sm:text-base hidden sm:block">Very Good Performance</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-4xl font-bold text-info font-display">{tutorData.results.grades.B}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">students</div>
                    </div>
                  </div>
                  <Progress value={28} className="h-2 sm:h-3" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Grade C */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card hover-lift border-warning/30">
                <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-warning to-warning/70 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-xl sm:text-3xl font-bold text-white">C</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold font-display">Grade C Students</h3>
                        <p className="text-muted-foreground text-xs sm:text-base hidden sm:block">Good Performance</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-4xl font-bold text-warning font-display">{tutorData.results.grades.C}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">students</div>
                    </div>
                  </div>
                  <Progress value={7} className="h-2 sm:h-3" />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            className="text-center mt-8 sm:mt-10 lg:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-card max-w-2xl mx-auto">
              <CardContent className="py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <span className="font-semibold">100% Pass Rate</span>
                  </div>
                  <span className="text-muted-foreground hidden sm:block">|</span>
                  <span className="font-semibold text-success">93% A & B Grades</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Credentials</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
              Qualifications & Recognition
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Excellence backed by credentials and proven track record
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {tutorData.achievements.map((achievement, index) => {
              const Icon = achievement.icon === "GraduationCap" ? GraduationCap :
                          achievement.icon === "Award" ? Award : Trophy;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-card hover-lift hover-glow border-border/50 group h-full">
                    <CardContent className="pt-6 sm:pt-8 text-center space-y-4 sm:space-y-6">
                      <div className="flex justify-center">
                        <div className="p-4 sm:p-6 bg-gradient-primary rounded-xl sm:rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg sm:text-xl lg:text-2xl font-display group-hover:text-primary transition-colors">{achievement.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{achievement.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2 inline" />
                Teaching Excellence
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
                Student-Centered Learning Approach
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {tutorData.teachingStyle}
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: BookOpen, title: "Interactive Sessions", desc: "Practical demonstrations and real-world applications" },
                  { icon: Zap, title: "Regular Assessments", desc: "Weekly tests and monthly progress tracking" },
                  { icon: Star, title: "Comprehensive Materials", desc: "Notes, videos, and practice papers included" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="glass-card hover-lift border-border/50 group">
                      <CardContent className="py-3 sm:py-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold font-display mb-0.5 sm:mb-1 text-sm sm:text-base">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative order-first lg:order-last" 
              id="demo-video"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-video rounded-2xl sm:rounded-3xl bg-gradient-primary flex items-center justify-center relative overflow-hidden shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 text-center space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 sm:w-10 sm:h-10 text-white ml-1" />
                  </div>
                  <p className="text-white font-semibold text-sm sm:text-lg">Watch Teaching Demo</p>
                </div>
                <div className="absolute top-6 sm:top-10 right-6 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-24 sm:w-40 h-24 sm:h-40 bg-white/10 rounded-full blur-2xl" />
              </div>

              {/* Floating Stats */}
              <motion.div 
                className="absolute -bottom-4 sm:-bottom-8 left-4 sm:left-8 glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl hidden sm:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  <div>
                    <div className="font-bold font-display text-sm sm:text-base">Live Q&A</div>
                    <div className="text-xs text-muted-foreground">Every Session</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Student Reviews</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Hear from students who transformed their grades
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {tutorData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card hover-lift border-border/50 group h-full">
                  <CardContent className="pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                    <div className="flex gap-0.5 sm:gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-warning text-warning" />
                      ))}
                    </div>
                    <blockquote className="text-base sm:text-lg text-foreground leading-relaxed">
                      <span className="text-3xl sm:text-4xl text-primary/20 font-serif">"</span>
                      {testimonial.text}
                      <span className="text-3xl sm:text-4xl text-primary/20 font-serif">"</span>
                    </blockquote>
                    <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border/50">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-lg sm:text-xl font-bold text-white">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold font-display text-sm sm:text-base">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.grade}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">FAQs</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our classes
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="glass-card border-border/50">
                    <AccordionItem value={`item-${index}`} className="border-none">
                      <AccordionTrigger className="px-4 sm:px-6 hover:no-underline hover:bg-primary/5 transition-colors text-left">
                        <span className="font-bold font-display text-sm sm:text-base">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Updates</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
              Latest Announcements
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Stay informed about class updates and important dates
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {announcementsData.slice(0, 3).map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`glass-card hover-lift border-border/50 ${announcement.important ? 'border-primary/50 shadow-glow' : ''} group`}
                >
                  <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          {announcement.important && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Important
                            </Badge>
                          )}
                          <h3 className="font-bold text-base sm:text-xl font-display group-hover:text-primary transition-colors">{announcement.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{announcement.content}</p>
                      </div>
                      <Badge variant="outline" className="whitespace-nowrap text-xs">
                        {new Date(announcement.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card max-w-4xl mx-auto border-primary/20 shadow-glow">
              <CardContent className="py-8 sm:py-10 lg:py-12 text-center space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 sm:w-16 lg:w-20 sm:h-16 lg:h-20 bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                    <Send className="w-7 h-7 sm:w-8 lg:w-10 sm:h-8 lg:h-10 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display">
                    Stay Updated
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                    Subscribe to our newsletter for class updates, study tips, and exclusive resources
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-11 sm:h-12 rounded-lg sm:rounded-xl"
                  />
                  <Button type="submit" size="lg" className="group h-11 sm:h-12">
                    Subscribe
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  Join 500+ students receiving weekly updates. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
