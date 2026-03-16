import LandingFeatureCard from "@/components/LandingFeatureCard";
import {
  AirVent,
  ArrowUp,
  Brain,
  CheckCircle2,
  Leaf,
  Mail,
  Menu,
  Shield,
  ThermometerSun,
  TrendingUp,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ECFanCardProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
  benefits: string[];
};

const ECFanCard = (props: ECFanCardProps) => {
  const { title, text, icon, benefits } = props;
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{text}</p>
      <ul className="space-y-1.5">
        {benefits.map((benefit, index) => (
          <li
            className="flex items-center gap-2 text-sm text-gray-600"
            key={index}
          >
            <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const featureCards: ECFanCardProps[] = [
  {
    title: "High-Efficiency Motors",
    text: "EC motors that deliver more airflow per watt than AC alternatives.",
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
    benefits: [
      "IE5 efficiency class",
      "Aerodynamically optimized impellers",
      "German-engineered components",
    ],
  },
  {
    title: "Built-in Monitoring",
    text: "Each fan reports speed, temperature, power draw, and vibration — no external sensors needed.",
    icon: <Brain className="w-5 h-5 text-primary" />,
    benefits: [
      "Live performance data",
      "Early fault detection",
      "Full diagnostic history",
    ],
  },
  {
    title: "Quick Installation",
    text: "Drop-in replacement for existing fans. No rewiring, no controller changes.",
    icon: <Zap className="w-5 h-5 text-accent" />,
    benefits: [
      "Plug-and-play wiring",
      "Standard mounting sizes",
      "Retrofit-ready",
    ],
  },
  {
    title: "BMS Compatible",
    text: "Connects to your existing building management system over Modbus or BACnet.",
    icon: <ThermometerSun className="w-5 h-5 text-gray-700" />,
    benefits: [
      "Modbus and BACnet support",
      "Works with existing BMS",
      "IoT-ready interfaces",
    ],
  },
  {
    title: "Compact Form Factor",
    text: "Fits in the same footprint as the fan it replaces. No structural changes needed.",
    icon: <AirVent className="w-5 h-5 text-gray-700" />,
    benefits: [
      "Same-size replacement",
      "Lightweight build",
      "No structural modifications",
    ],
  },
  {
    title: "Variable Speed",
    text: "Fan speed adjusts continuously to match actual demand — no fixed-speed waste.",
    icon: <Leaf className="w-5 h-5 text-emerald-700" />,
    benefits: [
      "0–100% speed range",
      "Demand-matched output",
      "Cube-law energy savings",
    ],
  },
];

const comparisonRows = [
  {
    label: "Energy Savings",
    values: ["N/A", "Up to 20%", "Up to 35%", "Up to 60%"],
    checks: [null, null, null, null],
  },
  {
    label: "Preventive Maintenance",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Runs Without Manual Intervention",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Maintenance-based Savings",
    values: [null, null, null, "Up to 10%"],
    checks: [false, false, false, null],
  },
  {
    label: "Demand-controlled Ventilation",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Redundancy (No Single Point of Failure)",
    values: [null, null, null, null],
    checks: [false, true, true, true],
  },
  {
    label: "Motor Temperature Monitoring",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Automated Alerts",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Maintenance Ticket Generation",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
];

const howItWorksSteps = [
  {
    num: "01",
    title: "Connect",
    desc: "EC fans and sensors in each AHU connect to a Garvata edge device.",
  },
  {
    num: "02",
    title: "Run Locally",
    desc: "Edge devices control fans independently — even if the network goes down.",
  },
  {
    num: "03",
    title: "Optimize",
    desc: "Our AI analyses data across all units and adjusts fan speed for peak efficiency.",
  },
  {
    num: "04",
    title: "Monitor",
    desc: "A cloud dashboard gives you real-time visibility, alerts, and performance history.",
  },
];

const allImages = [
  "/fans/garvata-fan-01.webp",
  "/fans/garvata-fan-02.webp",
  "/fans/garvata-fan-03.webp",
  "/fans/garvata-fan-04.webp",
  "/fans/garvata-fan-05.avif",
  "/fans/garvata-fan-06.webp",
  "/fans/garvata-fan-07.webp",
  "/fans/garvata-fan-08.webp",
  "/fans/garvata-fan-09.webp",
  "/fans/garvata-fan-10.webp",
  "/fans/garvata-fan-11.webp",
  "/fans/garvata-fan-12.webp",
];

function CheckIcon({ label }: { label: string }) {
  return (
    <>
      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 mx-auto" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </>
  );
}

function XIcon({ label }: { label: string }) {
  return (
    <>
      <XCircle className="w-4.5 h-4.5 text-gray-300 mx-auto" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </>
  );
}

const Index = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const ecFansref = useRef<HTMLDivElement>(null);
  const keyBenefitsRef = useRef<HTMLDivElement>(null);
  const howItComparesRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // M4: Use matchMedia instead of resize listener
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const images = isMobile ? allImages.slice(0, 4) : allImages;

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    const element = ref.current;
    if (element) {
      const offset = 32;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // H5: Escape key closes drawer
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // H5: Focus trap — focus the drawer when it opens
  useEffect(() => {
    if (isDrawerOpen && drawerRef.current) {
      const firstButton = drawerRef.current.querySelector("button");
      firstButton?.focus();
    }
  }, [isDrawerOpen]);

  const handleNavClick = (scrollFunction: () => void) => {
    scrollFunction();
    closeDrawer();
  };

  const navLinks = [
    { label: "How It Compares", ref: howItComparesRef },
    { label: "How It Works", ref: howItWorksRef },
    { label: "EC Fans", ref: ecFansref },
    { label: "Capabilities", ref: keyBenefitsRef },
  ];

  return (
    <div className="min-h-screen w-full font-sans bg-white">
      {/* M5: Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-gray-900 focus:font-medium"
      >
        Skip to content
      </a>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <img src="/logo192.svg" alt="" className="w-7 h-7" />
              <span className="text-lg font-serif font-bold text-gray-900">
                GarvataAI
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1 text-sm">
              {navLinks.map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => scrollToRef(ref)}
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 min-h-[44px] flex items-center"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollToRef(contactRef)}
                className="ml-3 bg-gray-900 text-white text-sm font-medium rounded-lg px-5 py-2 min-h-[44px] hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </button>
            </div>

            <button
              onClick={openDrawer}
              className="md:hidden text-gray-600 p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-xl transform transition-transform duration-200 ease-out z-50 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <img src="/logo192.svg" alt="" className="w-6 h-6" />
              <span className="font-serif font-bold text-gray-900">
                Garvata
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="text-gray-400 hover:text-gray-600 p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map(({ label, ref }) => (
              <button
                key={label}
                onClick={() => handleNavClick(() => scrollToRef(ref))}
                className="text-gray-600 hover:text-gray-900 text-left py-2.5 min-h-[44px] transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick(() => scrollToRef(contactRef))}
              className="bg-gray-900 text-white text-left py-2.5 px-4 rounded-lg font-medium mt-4 min-h-[44px] hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={closeDrawer}
        />
      )}

      {/* H1: Main landmark */}
      <main id="main-content">
        {/* ─── Hero ─── */}
        <section className="pt-32 pb-20 px-4">
          <div className="container max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-5">
              Autonomous AHU Control
            </p>
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] font-serif font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Cut your Air Handling Unit energy costs by up to 60%
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
              Autonomous control for AHUs that reduces energy spend, prevents
              breakdowns, and runs without manual intervention.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollToRef(contactRef)}
                className="bg-primary text-white font-semibold rounded-lg px-8 py-3.5 min-h-[44px] hover:bg-primary/90 transition-colors"
              >
                Talk to Sales
              </button>
              <a
                href="https://demo.garvata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 font-medium transition-colors flex items-center gap-1 min-h-[44px]"
              >
                View Demo <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── Stats Band ─── */}
        <section className="border-y border-gray-200 bg-gray-50 py-12 px-4">
          <div className="container max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center">
            <div>
              <p className="font-mono text-3xl md:text-4xl font-bold text-primary mb-1">
                60%
              </p>
              <p className="text-sm text-gray-600">Energy Savings</p>
            </div>
            <div className="sm:border-x sm:border-gray-200">
              <p className="font-mono text-3xl md:text-4xl font-bold text-accent mb-1">
                24/7
              </p>
              <p className="text-sm text-gray-600">Always-on, No Manual Oversight</p>
            </div>
            <div>
              <p className="font-mono text-3xl md:text-4xl font-bold text-emerald-700 mb-1">
                10%
              </p>
              <p className="text-sm text-gray-600">
                Additional Maintenance Savings
              </p>
            </div>
          </div>
        </section>

        {/* ─── Value Propositions ─── */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <LandingFeatureCard
              icon={<TrendingUp className="w-5 h-5 text-primary" />}
              title="Optimize Costs"
              text="Demand-based fan controls cut unnecessary runtime. Typical payback within 18–20 months."
            />
            <LandingFeatureCard
              icon={<Leaf className="w-5 h-5 text-emerald-700" />}
              title="Save Energy"
              text="Responds to temperature and humidity in real time, adjusting fan speed instead of running at full power."
            />
            <LandingFeatureCard
              icon={<ThermometerSun className="w-5 h-5 text-accent" />}
              title="Less Maintenance"
              text="Lower fan stress means fewer breakdowns. The system flags issues before they cause downtime."
            />
          </div>
        </section>

        {/* ─── How It Compares ─── */}
        <section
          ref={howItComparesRef}
          className="bg-gray-50 border-y border-gray-200 py-20 px-4"
        >
          <div className="container max-w-5xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center scroll-mt-20"
              id="how-it-compares"
            >
              How It Compares
            </h2>
            <p className="text-xs text-gray-400 mb-2 md:hidden">Scroll to see all columns &rarr;</p>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Comparison table">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 pr-4 font-serif font-semibold text-gray-900 w-1/4">
                      Feature
                    </th>
                    <th className="py-3 px-2 font-serif font-semibold text-gray-900 text-center">
                      Axial Fan + VFD
                    </th>
                    <th className="py-3 px-2 font-serif font-semibold text-gray-900 text-center">
                      Plug Fan + VFD
                    </th>
                    <th className="py-3 px-2 font-serif font-semibold text-gray-900 text-center">
                      EC Fan Only
                    </th>
                    <th className="py-3 pl-2 font-serif font-bold text-primary text-center border-l-2 border-primary">
                      EC Fan + GarvataAI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-100/50 transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium text-gray-900">
                        {row.label}
                      </td>
                      {[0, 1, 2, 3].map((col) => (
                        <td
                          key={col}
                          className={`py-3 px-2 text-center ${col === 3 ? "bg-primary/[0.03] border-l-2 border-primary" : ""}`}
                        >
                          {row.values[col] ? (
                            <span
                              className={`${col === 3 ? "font-mono font-semibold text-primary" : "text-gray-600"}`}
                            >
                              {row.values[col]}
                            </span>
                          ) : row.checks[col] === true ? (
                            <CheckIcon label="Yes" />
                          ) : row.checks[col] === false ? (
                            <XIcon label="No" />
                          ) : row.checks[col] === "bad-true" ? (
                            <>
                              <CheckCircle2 className="w-4.5 h-4.5 text-red-500 mx-auto" aria-hidden="true" />
                              <span className="sr-only">Yes (risk)</span>
                            </>
                          ) : row.checks[col] === "good-false" ? (
                            <>
                              <XCircle className="w-4.5 h-4.5 text-emerald-600 mx-auto" aria-hidden="true" />
                              <span className="sr-only">No (good)</span>
                            </>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section ref={howItWorksRef} className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2
                className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 scroll-mt-20"
                id="how-it-works"
              >
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each AHU gets an edge device. The edge devices talk to our AI. The AI
                optimizes everything. You watch from a dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4">
              {howItWorksSteps.map((step, i) => (
                <div
                  key={step.num}
                  className={`py-6 md:py-0 md:px-6 md:text-center ${i < howItWorksSteps.length - 1 ? "border-b md:border-b-0 md:border-r border-dashed border-gray-300" : ""}`}
                >
                  <span className="font-mono text-xs text-primary font-bold mb-2 block">
                    {step.num}
                  </span>
                  <h3 className="font-serif font-bold text-gray-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EC Fans ─── */}
        <section
          ref={ecFansref}
          className="bg-gray-50 border-y border-gray-200 py-20"
        >
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2
                className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 scroll-mt-20"
                id="ec-fans"
              >
                Garvata EC Fans
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                German-engineered EC fans built for commercial HVAC.
                Designed to pair with Garvata's autonomous control system.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-[48rem] mx-auto">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="w-[10rem] md:w-[14rem] h-[10rem] rounded-lg overflow-hidden border border-gray-200 bg-white"
                >
                  <img
                    src={src}
                    loading="lazy"
                    width={224}
                    height={160}
                    alt={`Garvata EC Fan ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EC Fan Capabilities ─── */}
        <section ref={keyBenefitsRef} className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-10 text-center scroll-mt-20"
              id="capabilities"
            >
              EC Fan Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featureCards.map((card) => (
                <ECFanCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section
          ref={contactRef}
          className="bg-gray-50 border-y border-gray-200 py-20 px-4"
        >
          <div className="container max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 scroll-mt-20"
              id="contact"
            >
              Ready to reduce your energy costs?
            </h2>
            <p className="text-gray-600 mb-8">
              We'll walk you through a live system and show you the numbers
              for your building.
            </p>
            {/* H2: Use <a> instead of <button> for mailto */}
            <a
              href="mailto:info@garvata.com"
              className="bg-primary text-white font-semibold rounded-lg px-8 py-3.5 min-h-[44px] hover:bg-primary/90 transition-colors mb-10 inline-flex items-center"
            >
              Talk to Sales
            </a>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm">
              <a
                href="mailto:info@garvata.com"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>info@garvata.com</span>
              </a>
              <a
                href="https://x.com/garvataHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors min-h-[44px]"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>@garvataHQ</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img src="/logo192.svg" alt="" className="w-4 h-4 opacity-50" />
            <span>&copy; 2026 Garvata</span>
          </div>
          <span>Smarter buildings, lower bills.</span>
        </div>
      </footer>

      {/* ─── Scroll to top ─── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-900 text-white p-3 rounded-lg shadow-md hover:bg-gray-800 transition-colors z-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Index;
