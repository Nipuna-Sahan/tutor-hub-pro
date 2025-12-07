import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import classesData from "@/data/classes.json";

const Classes = () => {
  const [selectedInstitution, setSelectedInstitution] = useState("all");

  // Get list of institutions dynamically
  const institutions = [
    "all",
    ...new Set(classesData.map((c) => c.institution))
  ];

  // Filter classes by institution
  const filteredClasses =
    selectedInstitution === "all"
      ? classesData
      : classesData.filter(
          (cls) => cls.institution === selectedInstitution
        );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Our Classes
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect Science class for your grade level
            </p>
          </div>
        </section>

        {/* Institution Filter */}
        <div className="container mx-auto px-4 mt-10 max-w-3xl">
          <label className="font-semibold text-sm">Select Institution</label>
          <select
            className="w-full p-3 border rounded-xl mt-2 bg-background"
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
          >
            {institutions.map((inst, i) => (
              <option key={i} value={inst}>
                {inst === "all" ? "All Institutions" : inst}
              </option>
            ))}
          </select>
        </div>

        {/* Classes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredClasses.map((classItem) => (
                <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-2xl">{classItem.title}</CardTitle>
                      <span className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {classItem.grade}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      Institution: <strong>{classItem.institution}</strong>
                    </p>
                    <p className="text-muted-foreground">{classItem.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>
                          {classItem.timetable
                            .map((t) => `${t.day} ${t.time}`)
                            .join(", ")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span>Monthly: {classItem.fees.monthly}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>{classItem.features.length} special features</span>
                      </div>
                    </div>

                    <Link to={`/classes/${classItem.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}

              {filteredClasses.length === 0 && (
                <p className="text-center text-muted-foreground col-span-2">
                  No classes found for this institution.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Classes;
