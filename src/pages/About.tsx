import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Target, Heart } from "lucide-react";
import tutorData from "@/data/tutor.json";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              About {tutorData.name}
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              {tutorData.title}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <img 
                  src={tutorData.photo} 
                  alt={tutorData.name}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Welcome to My Class</h2>
                <p className="text-muted-foreground mb-4">
                  {tutorData.bio}
                </p>
                <p className="text-muted-foreground">
                  {tutorData.teachingStyle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifications */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Qualifications & Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tutorData.achievements.map((achievement, index) => {
                const Icon = achievement.icon === "GraduationCap" ? GraduationCap :
                            achievement.icon === "Award" ? BookOpen : Target;
                return (
                  <Card key={index}>
                    <CardContent className="pt-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-bold text-xl mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                My Teaching Philosophy
              </h2>
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3">Student-Centered Approach</h3>
                      <p className="text-muted-foreground">
                        Every student is unique with different learning styles and paces. I adapt my teaching methods 
                        to ensure that each student understands the fundamentals clearly before moving forward. 
                        My goal is not just to help students pass exams, but to develop a genuine understanding and 
                        appreciation for Science.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3">Practical Learning</h3>
                      <p className="text-muted-foreground">
                        Science is best learned through practical demonstrations and real-world examples. 
                        I incorporate experiments, visual aids, and interactive discussions to make complex 
                        concepts easy to understand. Students don't just memorize - they truly comprehend the material.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3">Results-Oriented</h3>
                      <p className="text-muted-foreground">
                        With over 15 years of experience, I've developed effective strategies for O/L exam success. 
                        My structured approach includes regular assessments, past paper practice, and personalized 
                        feedback. The consistent excellent results of my students speak for themselves.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Highlight */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Proven Track Record
            </h2>
            <p className="text-muted-foreground mb-8">
              {tutorData.results.year} O/L Science Results
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-success/10 rounded-xl border border-success/20">
                <div className="text-5xl font-bold text-success mb-2">
                  {tutorData.results.grades.A}
                </div>
                <p className="text-lg font-semibold">A Grades</p>
              </div>
              <div className="p-6 bg-info/10 rounded-xl border border-info/20">
                <div className="text-5xl font-bold text-info mb-2">
                  {tutorData.results.grades.B}
                </div>
                <p className="text-lg font-semibold">B Grades</p>
              </div>
              <div className="p-6 bg-warning/10 rounded-xl border border-warning/20">
                <div className="text-5xl font-bold text-warning mb-2">
                  {tutorData.results.grades.C}
                </div>
                <p className="text-lg font-semibold">C Grades</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
