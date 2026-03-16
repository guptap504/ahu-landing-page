import LandingFeatureCard from "@/components/LandingFeatureCard";
import {
  AirVent,
  ArrowUp,
  Brain,
  CheckCircle2,
  Cloud,
  Leaf,
  Mail,
  Menu,
  Shield,
  ThermometerSun,
  TrendingUp,
  X,
  XCircle,
  Zap,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

type ECFanCardProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
  benefits: string[];
};

const ECFanCard = (props: ECFanCardProps) => {
  const { title, text, icon, benefits } = props;
  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
      <div className="mb-5">{icon}</div>
      <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-5 leading-relaxed">{text}</p>
      <ul className="space-y-2">
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

const carouselCards: ECFanCardProps[] = [
  {
    title: "High Efficiency Factor",
    text: "Advanced electronically commutated motor technology delivers exceptional efficiency ratings, maximizing airflow while minimizing power consumption.",
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
    benefits: [
      "Superior motor efficiency",
      "Optimized aerodynamic design",
      "German engineering standards",
    ],
  },
  {
    title: "Low Energy Consumption",
    text: "Dramatically reduce your energy costs with intelligent power management and variable speed control that adapts to real-time demand.",
    icon: <Leaf className="w-5 h-5 text-emerald-700" />,
    benefits: [
      "Variable speed operation",
      "Smart power management",
      "Energy-saving algorithms",
    ],
  },
  {
    title: "Integrated Monitoring",
    text: "Built-in sensors and monitoring capabilities provide real-time performance data and predictive maintenance insights for optimal operation.",
    icon: <Brain className="w-5 h-5 text-primary" />,
    benefits: [
      "Real-time performance monitoring",
      "Predictive maintenance alerts",
      "Comprehensive diagnostics",
    ],
  },
  {
    title: "Easy Installation",
    text: "Streamlined installation process with plug-and-play connectivity reduces setup time and minimizes integration complexity.",
    icon: <Zap className="w-5 h-5 text-accent" />,
    benefits: [
      "Plug-and-play design",
      "Universal mounting options",
      "Simplified wiring",
    ],
  },
  {
    title: "Expanded Functionality",
    text: "Advanced control features and communication protocols enable seamless integration with building management systems and IoT platforms.",
    icon: <ThermometerSun className="w-5 h-5 text-gray-700" />,
    benefits: [
      "Multiple communication protocols",
      "BMS integration ready",
      "IoT connectivity",
    ],
  },
  {
    title: "Compact Construction",
    text: "Space-efficient design maximizes performance while minimizing footprint, perfect for modern building constraints and retrofits.",
    icon: <AirVent className="w-5 h-5 text-gray-700" />,
    benefits: [
      "Space-saving design",
      "Lightweight construction",
      "Retrofit-friendly",
    ],
  },
];

const comparisonRows = [
  {
    label: "Energy Saving",
    values: ["-----", "upto 20%", "upto 35%", "upto 60%"],
    checks: [null, null, null, null],
  },
  {
    label: "Preventive Maintenance",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Autonomous Operation",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Energy Saving through Preventive Maintenance",
    values: [null, null, null, "YES upto 10%"],
    checks: [false, false, false, null],
  },
  {
    label: "Demand-controlled Ventilation (DCV)",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Single Point of Failure",
    values: [null, null, null, null],
    checks: ["bad-true", "good-false", "good-false", "good-false"],
  },
  {
    label: "Motor Input Like Temp",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Regular Alerts",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Operation Tickets",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
];

const howItWorksSteps = [
  {
    num: "01",
    title: "AHU Network",
    desc: "EC fans and sensors connected to dedicated Garvata Edge Devices for real-time monitoring.",
    icon: <AirVent className="w-5 h-5" />,
  },
  {
    num: "02",
    title: "Edge Intelligence",
    desc: "Smart intermediaries ensuring reliable communication, even during network interruptions.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    num: "03",
    title: "AI Controller",
    desc: "Central AI processing data from all edge devices for optimal energy efficiency and maintenance.",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    num: "04",
    title: "Cloud Platform",
    desc: "Comprehensive monitoring, analytics, and ML-driven continuous performance improvement.",
    icon: <Cloud className="w-5 h-5" />,
  },
];

const Index = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const ecFansref = useRef<HTMLDivElement>(null);
  const keyBenefitsRef = useRef<HTMLDivElement>(null);
  const howItComparesRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 640;

  let images = [
    "/fans/zen0.png",
    "/fans/zen1.webp",
    "/fans/zen2.jpg",
    "/fans/zen3.webp",
    "/fans/zen4.avif",
    "/fans/zen7.jpg",
    "/fans/zen10.webp",
    "/fans/zen11.jpg",
    "/fans/zen12.webp",
    "/fans/zen1 (1).webp",
    "/fans/zen11 (1).jpg",
    "/fans/zen14.jpg",
  ];
  if (isMobile) {
    images = images.slice(0, 4);
  }

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    const element = ref.current;
    if (element) {
      const offset = 32;
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
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavClick = (scrollFunction: () => void) => {
    scrollFunction();
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen w-full font-sans bg-white">
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

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 text-sm">
              {[
                { label: "How It Compares", ref: howItComparesRef },
                { label: "How It Works", ref: howItWorksRef },
                { label: "EC Fans", ref: ecFansref },
                { label: "Key Features", ref: keyBenefitsRef },
              ].map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => scrollToRef(ref)}
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollToRef(contactRef)}
                className="ml-3 bg-gray-900 text-white text-sm font-medium rounded-lg px-5 py-2 hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleDrawer}
              className="md:hidden text-gray-600"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─── */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-200 ease-out z-50 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
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
              onClick={toggleDrawer}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col space-y-1">
            {[
              { label: "How It Compares", ref: howItComparesRef },
              { label: "How It Works", ref: howItWorksRef },
              { label: "EC Fans", ref: ecFansref },
              { label: "Key Features", ref: keyBenefitsRef },
            ].map(({ label, ref }) => (
              <button
                key={label}
                onClick={() => handleNavClick(() => scrollToRef(ref))}
                className="text-gray-600 hover:text-gray-900 text-left py-2.5 transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick(() => scrollToRef(contactRef))}
              className="bg-gray-900 text-white text-left py-2.5 px-4 rounded-lg font-medium mt-4 hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-5">
            Autonomous AHU Control
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Reduce AHU energy costs by up to 60%
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
            AI-powered autonomous control for air handling units. Save energy,
            prevent downtime, and achieve effortless HVAC efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToRef(contactRef)}
              className="bg-primary text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-primary/90 transition-colors"
            >
              Schedule a Demo
            </button>
            <a
              href="https://demo.garvata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-1"
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
            <p className="text-sm text-gray-500">Energy Savings</p>
          </div>
          <div className="sm:border-x sm:border-gray-200">
            <p className="font-mono text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              24/7
            </p>
            <p className="text-sm text-gray-500">Autonomous Operation</p>
          </div>
          <div>
            <p className="font-mono text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              10%
            </p>
            <p className="text-sm text-gray-500">
              Savings via Preventive Maintenance
            </p>
          </div>
        </div>
      </section>

      {/* ─── Value Propositions ─── */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
          <LandingFeatureCard
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            title="Optimize Costs"
            text="Intelligent, demand-based fan controls that minimize unnecessary runtime and reduce operating expenses."
          />
          <LandingFeatureCard
            icon={<Leaf className="w-5 h-5 text-emerald-700" />}
            title="Save Energy"
            text="Real-time response to temperature and humidity changes, dramatically lowering your building's energy consumption."
          />
          <LandingFeatureCard
            icon={<ThermometerSun className="w-5 h-5 text-accent" />}
            title="Less Maintenance"
            text="Reduced stress on EC fans means fewer breakdowns, fewer manual interventions, and lower maintenance spend."
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
            className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-12 text-center scroll-mt-20"
            id="how-it-compares"
          >
            How It Compares
          </h2>
          <div className="overflow-x-auto">
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
                  <th className="py-3 pl-2 font-serif font-bold text-primary text-center">
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
                        className={`py-3 px-2 text-center ${col === 3 ? "bg-primary/[0.03]" : ""}`}
                      >
                        {row.values[col] ? (
                          <span
                            className={`${col === 3 ? "font-mono font-semibold text-primary" : "text-gray-500"}`}
                          >
                            {row.values[col]}
                          </span>
                        ) : row.checks[col] === true ? (
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
                        ) : row.checks[col] === false ? (
                          <XCircle className="w-4.5 h-4.5 text-gray-300 mx-auto" />
                        ) : row.checks[col] === "bad-true" ? (
                          <CheckCircle2 className="w-4.5 h-4.5 text-red-400 mx-auto" />
                        ) : row.checks[col] === "good-false" ? (
                          <XCircle className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
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
              A seamless network of AHUs connected through edge devices to our
              AI-powered controller, enabling autonomous operation and
              cloud-based monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {howItWorksSteps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex md:flex-col items-start gap-4 md:gap-0 py-6 md:py-0 md:px-6 md:text-center"
              >
                {/* Connector line (between steps) */}
                {i < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-4 right-0 w-px h-[calc(100%-2rem)] md:w-full md:h-px md:top-3 md:left-1/2 border-t border-dashed border-gray-300" />
                )}
                <span className="font-mono text-xs text-primary font-semibold md:mb-3 mt-0.5">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
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
              Superior performance with German engineering excellence, providing
              unmatched efficiency for your HVAC systems.
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
                  alt={`Garvata EC Fan ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Key Features Carousel ─── */}
      <section ref={keyBenefitsRef} className="py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8 text-center scroll-mt-20"
            id="key-features"
          >
            Key Features
          </h2>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex-shrink-0 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <CircleChevronLeft className="w-full h-full" />
            </button>
            <div className="embla overflow-hidden w-full" ref={emblaRef}>
              <div className="embla__container flex">
                {carouselCards.map((card) => (
                  <div
                    className="embla__slide flex-[0_0_100%] md:flex-[0_0_calc(100%/3)] min-w-0 p-2"
                    key={card.title}
                  >
                    <ECFanCard {...card} />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex-shrink-0 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <CircleChevronRight className="w-full h-full" />
            </button>
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
          <p className="text-gray-600 mb-10">
            Get in touch and we'll walk you through our autonomous AHU solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <a
              href="mailto:info@garvata.com"
              className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">info@garvata.com</span>
            </a>
            <a
              href="https://x.com/garvataHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-medium">@garvataHQ</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/logo192.svg" alt="" className="w-4 h-4 opacity-50" />
            <span>&copy; 2025 Garvata</span>
          </div>
          <span>Optimizing Air, Effortlessly.</span>
        </div>
      </footer>

      {/* ─── Scroll to top ─── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-900 text-white p-2.5 rounded-lg shadow-md hover:bg-gray-800 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Index;
