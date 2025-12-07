import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, Facebook, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
              <span>AshenScience</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Quality Science Education for O/L Success
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Me
              </Link>
              <Link to="/classes" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Classes
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              {/* <Link to="/resources" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link to="/payment" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Payment
              </Link> */}
            </div>
          </div>

          {/* Classes */}
          <div>
            <h3 className="font-semibold mb-4">Our Classes</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Grade 6-7 Foundation</p>
              <p className="text-sm text-muted-foreground">Grade 8-9 Advanced</p>
              <p className="text-sm text-muted-foreground">Grade 10 O/L Prep</p>
              <p className="text-sm text-muted-foreground">Grade 11 O/L Revision</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+94 71 167 8229</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>ashensrimal287@gmail.com</span>
              </div>
              <div className="flex gap-3 mt-4">
                <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                  <Facebook className="w-4 h-4 text-primary" />
                </a>
                <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AshenScience. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
