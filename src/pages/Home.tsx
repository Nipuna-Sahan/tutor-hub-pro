import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Trophy, BookOpen, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import tutorData from "@/data/tutor.json";
import announcementsData from "@/data/announcements.json";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Tutor Introduction */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to {tutorData.name}'s
                <span className="text-primary block mt-2">Science Classes</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {tutorData.bio}
              </p>
              <div className="flex gap-4">
                <Link to="/classes/ol-revision-2025">
                  <Button size="lg">Join 2025 O/L Revision</Button>
                </Link>
                <Link to="/classes">
                  <Button size="lg" variant="outline">View All Classes</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={tutorData.photo} 
                alt={tutorData.name}
                className="rounded-2xl shadow-2xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Qualifications & Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tutorData.achievements.map((achievement, index) => {
              const Icon = achievement.icon === "GraduationCap" ? GraduationCap :
                          achievement.icon === "Award" ? Award : Trophy;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
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

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Outstanding O/L Results
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {tutorData.results.year} O/L Science Results
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card className="text-center bg-success/10 border-success/20">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-success mb-2">
                  {tutorData.results.grades.A}
                </div>
                <p className="text-lg font-semibold">Students Got A</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-info/10 border-info/20">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-info mb-2">
                  {tutorData.results.grades.B}
                </div>
                <p className="text-lg font-semibold">Students Got B</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-warning/10 border-warning/20">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-warning mb-2">
                  {tutorData.results.grades.C}
                </div>
                <p className="text-lg font-semibold">Students Got C</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teaching Style Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            My Teaching Approach
          </h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground">
              {tutorData.teachingStyle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Interactive Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Engaging lessons with practical demonstrations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Small Batches</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized attention for every student
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Proven Results</h3>
                <p className="text-sm text-muted-foreground">
                  Track record of excellent O/L performances
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Student Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tutorData.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.grade}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest Announcements
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {announcementsData.slice(0, 3).map((announcement) => (
              <Card key={announcement.id} className={announcement.important ? "border-primary" : ""}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{announcement.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Excel in Science?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of successful students and start your journey today
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/classes">
              <Button size="lg" variant="secondary">
                Explore Classes
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
