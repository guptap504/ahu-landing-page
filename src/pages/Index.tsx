
import LandingFeatureCard from "@/components/LandingFeatureCard";
import { AirVent, ThermometerSun, Leaf, TrendingUp } from "lucide-react";

// For subtle background image
const backgroundUrl = "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80"; // Abstract mountain/green energy

const Index = () => {
  return (
    <div className="min-h-screen w-full font-inter bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-fixed py-0">
      {/* Hero Section */}
      <div className="bg-hero-gradient/80 backdrop-blur-md w-full pt-24 pb-32 flex flex-col items-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
          <span className="inline-block uppercase tracking-widest text-accent mb-2 font-semibold animate-fade-in-up">Automating AHU Fan Control</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in-up">
            Smarter Air. <span className="text-primary">Lower Costs.</span> Greener Future.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto mb-8 animate-fade-in-up">
            Our intelligent system optimizes your Air Handling Unit’s EC fan using precise temperature and humidity data.<br />
            <span className="text-gray-800">Save on energy, prevent downtime, achieve effortless efficiency.</span>
          </p>
          <a
            href="mailto:hello@yourahustartup.com"
            className="inline-block bg-primary text-white rounded-full px-8 py-4 font-bold shadow-lg hover:bg-accent focus:ring-4 focus:ring-accent transition animate-fade-in-up"
          >
            Get in Touch
          </a>
        </div>
      </div>
      {/* Features */}
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
            text="Advanced algorithms respond to real-time temperature and humidity, dramatically lowering your building’s energy use."
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
      {/* Tech Section */}
      <section className="container max-w-3xl mx-auto px-4 pb-24">
        <div className="rounded-2xl glass-morphism shadow-glass bg-white/70 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 animate-fade-in-up">
          <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900">
              How It Works
            </h2>
            <p className="text-gray-700">
              We bring together temperature and humidity sensors, IoT connectivity, and modern EC fans. Our system harvests real-time data, analyzes energy usage, and makes smart adjustments—<b>all automatically</b>.
            </p>
            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-center gap-2">
                <AirVent className="w-5 h-5 text-primary" /> Automated EC Fan Control
              </li>
              <li className="flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-accent" /> Real-time Temperature & Humidity
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" /> Sustainability Built In
              </li>
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative bg-feature-gradient p-6 rounded-2xl shadow-md w-64 h-64 flex flex-col gap-5 items-center justify-center">
              <ThermometerSun className="w-12 h-12 text-accent absolute -top-4 -left-4 bg-white rounded-full p-2 shadow-md animate-fade-in-up" />
              <Leaf className="w-10 h-10 text-green-500 absolute -bottom-4 -left-2 bg-white rounded-full p-2 shadow-md animate-fade-in-up" />
              <AirVent className="w-16 h-16 text-primary z-10" />
              <p className="text-center text-gray-900 font-bold">EC Fan Target</p>
              <TrendingUp className="w-10 h-10 text-primary absolute -bottom-6 -right-4 bg-white rounded-full p-2 shadow-md animate-fade-in-up" />
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white/60 py-8 mt-auto">
        <div className="container mx-auto text-center text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} air-flow-harmony-hub &mdash; Optimizing Air, Effortlessly.
        </div>
      </footer>
    </div>
  );
};

export default Index;
