import LandingFeatureCard from "@/components/LandingFeatureCard";
import {
  AirVent,
  ThermometerSun,
  Leaf,
  TrendingUp,
  Fan,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Brain,
  Shield,
  Zap,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Index = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const keyBenefitsRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToContact = () => {
    const element = contactRef.current;
    if (element) {
      const offset = 20; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToHowItWorks = () => {
    const element = howItWorksRef.current;
    if (element) {
      const offset = 20; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToKeyBenefits = () => {
    const element = keyBenefitsRef.current;
    if (element) {
      const offset = 20; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full font-inter bg-white py-0">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={scrollToTop}
                className="text-lg md:text-xl font-bold text-primary hover:text-accent transition-colors"
              >
                Garvata
              </button>
            </div>
            <div className="flex items-center space-x-2 md:space-x-8 text-sm md:text-base">
              <button
                onClick={scrollToHowItWorks}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                How It Works
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button
                onClick={scrollToKeyBenefits}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Key Benefits
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button
                onClick={scrollToContact}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-hero-gradient/80 backdrop-blur-md w-full pt-24 pb-32 px-4 flex flex-col items-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
          <span className="inline-block uppercase tracking-widest text-accent mb-2 font-semibold animate-fade-in-up">
            Autonomous AHU for Energy Saving
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in-up">
            Smarter Air. <span className="text-primary">Lower Costs.</span>{" "}
            Greener Future.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto mb-8 animate-fade-in-up">
            Revolutionizing AHUs with{" "}
            <span className="text-primary">AI-Powered Autonomy</span> and{" "}
            <span className="text-primary">EC Fan technology</span> for Energy
            Savings. Save on energy, prevent downtime, achieve effortless
            efficiency.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-block bg-primary text-white rounded-full px-8 py-4 font-bold shadow-lg hover:bg-accent focus:ring-4 focus:ring-accent transition animate-fade-in-up"
          >
            Get in Touch
          </button>
        </div>
      </div>
      <section className="relative z-10 -mt-16 pb-16">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <LandingFeatureCard
            icon={<TrendingUp className="w-7 h-7 text-accent" />}
            title="Optimize Costs"
            text="Reduce operating costs with intelligent, demand-based fan controls that minimize unnecessary runtime."
            colorClass="bg-energy"
          />
          <LandingFeatureCard
            icon={<Leaf className="w-7 h-7 text-green-500" />}
            title="Save Energy"
            text="Advanced algorithms respond to real-time temperature and humidity, dramatically lowering your building's energy use."
            colorClass="bg-green-50"
          />
          <LandingFeatureCard
            icon={<ThermometerSun className="w-7 h-7 text-primary" />}
            title="Less Maintenance"
            text="Fewer manual interventions and reduced stress on EC fans translate to less frequent breakdowns and lower maintenance spend."
            colorClass="bg-yellow-50"
          />
        </div>
      </section>
      <section
        ref={howItWorksRef}
        className="container max-w-3xl mx-auto px-4 pb-24 pt-24"
      >
        <div className="rounded-2xl glass-morphism shadow-glass bg-white/70 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 animate-fade-in-up">
          <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900">
              How It Works
            </h2>
            <p className="text-gray-700">
              We bring together temperature and humidity sensors, IoT
              connectivity, and modern EC fans. Our system harvests real-time
              data, analyzes energy usage, and makes smart adjustments—
              <b>all automatically</b>.
            </p>
            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-center gap-2">
                <AirVent className="w-5 h-5 text-primary" /> Automated EC Fan
                Control
              </li>
              <li className="flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-accent" /> Real-time
                Temperature & Humidity
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" /> Sustainability Built
                In
              </li>
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative bg-feature-gradient p-6 rounded-2xl shadow-md w-64 h-64 flex flex-col gap-5 items-center justify-center">
              <ThermometerSun className="w-12 h-12 text-accent absolute -top-4 -left-4 bg-white rounded-full p-2 shadow-md animate-fade-in-up" />
              <Leaf className="w-10 h-10 text-green-500 absolute -bottom-4 -left-2 bg-white rounded-full p-2 shadow-md animate-fade-in-up" />
              <AirVent className="w-16 h-16 text-primary z-10" />
              <p className="text-center text-gray-900 font-bold">
                EC Fan Target
              </p>
              <TrendingUp className="w-10 h-10 text-primary absolute -bottom-6 -right-4 bg-white rounded-full p-2 shadow-md animate-fade-in-up" />
            </div>
          </div>
        </div>
      </section>

      <section ref={keyBenefitsRef} className="bg-gray-50 py-24 pt-32">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Key Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our solution delivers measurable improvements across three
              critical areas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Autonomous Operation
              </h3>
              <p className="text-gray-600 mb-6">
                Self-learning algorithms continuously optimize performance
                without human intervention, reducing operational complexity and
                costs.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Self-diagnostic capabilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Predictive maintenance alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Adaptive control systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <ThermometerSun className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Enhanced Comfort
              </h3>
              <p className="text-gray-600 mb-6">
                Maintains optimal indoor conditions with precise temperature and
                humidity control, ensuring consistent comfort throughout your
                space.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Real-time environmental monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Zone-based climate control</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Smart occupancy detection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Increased Efficiency
              </h3>
              <p className="text-gray-600 mb-6">
                Optimizes energy consumption while maintaining performance,
                delivering significant cost savings and reducing environmental
                impact.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Energy usage analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Peak demand management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Carbon footprint reduction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        className="container max-w-3xl mx-auto px-4 py-24 pt-32"
      >
        <div className="rounded-2xl glass-morphism shadow-glass bg-white/70 p-8 md:p-12 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
            Contact Us
          </h2>
          <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-8 md:gap-12">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">kunal@garvata.com</p>
                <p className="text-gray-600">prashant@garvata.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 85272 05934</p>
                <p className="text-gray-600">+91 96432 36839</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full border-t border-gray-200 bg-white/60 py-8 mt-auto">
        <div className="container mx-auto text-center text-gray-500 font-medium">
          &copy; 2025 Garvata &mdash; Optimizing Air, Effortlessly.
        </div>
      </footer>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent focus:ring-4 focus:ring-accent transition-all duration-300 animate-fade-in-up z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Index;
