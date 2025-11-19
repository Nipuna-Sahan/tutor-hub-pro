import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, Navigate } from "react-router-dom";
import { Clock, DollarSign, CheckCircle, BookOpen } from "lucide-react";
import classesData from "@/data/classes.json";

const ClassDetail = () => {
  const { classId } = useParams();
  const classItem = classesData.find(c => c.id === classId);

  if (!classItem) {
    return <Navigate to="/classes" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-semibold px-3 py-1 bg-primary/20 text-primary rounded-full">
                  {classItem.grade}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {classItem.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {classItem.description}
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Syllabus */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Course Syllabus
                  </h2>
                  <ul className="space-y-3">
                    {classItem.syllabus.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Class Features</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {classItem.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Timetable */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">Class Times</h3>
                  </div>
                  <div className="space-y-3">
                    {classItem.timetable.map((slot, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <div className="font-semibold">{slot.day}</div>
                        <div className="text-sm text-muted-foreground">{slot.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fees */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">Fees</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Monthly Payment</div>
                      <div className="font-bold text-lg">{classItem.fees.monthly}</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-sm text-muted-foreground">Term Payment (Save 10%)</div>
                      <div className="font-bold text-lg text-primary">{classItem.fees.term}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-3">Ready to Join?</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Limited seats available. Secure your spot today!
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <a href="/contact">Contact Us to Enroll</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClassDetail;
