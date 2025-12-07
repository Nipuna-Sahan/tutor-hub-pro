import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import grades from "@/data/classes.json";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Feel free to reach out through any of these channels. We're here to help!
                  </p>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
                          <p className="text-muted-foreground">+94711678229</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Available 9 AM - 8 PM daily
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-muted-foreground">ashensrimal287@gmail.com</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            We'll respond within 24 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <MessageCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Facebook Messenger</h3>
                          <p className="text-muted-foreground">@AshenScience</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Quick response during class hours
                          </p>
                        </div>
                      </div>

                      {/* <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Location</h3>
                          <p className="text-muted-foreground">
                            Science Tuition Center<br />
                            123 Main Street<br />
                            Colombo, Sri Lanka
                          </p>
                        </div>
                      </div> */}

                      {/* <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Office Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 2 PM - 8 PM<br />
                            Saturday - Sunday: 8 AM - 6 PM
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="077 123 4567" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="grade">Grade Level</Label>
                        {/* <Input id="grade" placeholder="e.g., Grade 11" /> */}
                        <Select onValueChange={(value) => console.log("Selected:", value)}>
                          <SelectTrigger id="grade">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>

                          <SelectContent>
                            {grades.map((g) => (
                              <SelectItem key={g.id} value={g.grade}>
                                {g.grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us about your inquiry..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our classes today and start your journey to O/L success
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <a href="https://wa.me/94711678229" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+94711678229">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
