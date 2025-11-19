import { ComingSoon } from "@/components/ComingSoon";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const LMS = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Student Dashboard</h1>
          <ComingSoon />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LMS;
