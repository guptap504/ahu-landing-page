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
import useEmblaCarousel from 'embla-carousel-react'

type ECFanCardProps = {
    title: string;
    text: string;
    icon: React.ReactNode;
    benefits: string[];
};

const ECFanCard = (props: ECFanCardProps) => {
    const { title, text, icon, benefits } = props;
    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                {title}
            </h3>
            <p className="text-gray-600 mb-6">
                {text}
            </p>
            <ul className="space-y-2 text-gray-600">
                {benefits.map((benefit, index) => (
                    <li className="flex items-center gap-2" key={index}>
                        <Shield className="w-4 h-4 text-primary" />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const carouselCards: ECFanCardProps[] = [
    {
        title: "High Efficiency Factor",
        text: "Advanced electronically commutated motor technology delivers exceptional efficiency ratings, maximizing airflow while minimizing power consumption.",
        icon: <TrendingUp className="w-6 h-6 text-primary" />,
        benefits: ["Superior motor efficiency", "Optimized aerodynamic design", "German engineering standards"],
    },
    {
        title: "Low Energy Consumption",
        text: "Dramatically reduce your energy costs with intelligent power management and variable speed control that adapts to real-time demand.",
        icon: <Leaf className="w-6 h-6 text-green-600" />,
        benefits: ["Variable speed operation", "Smart power management", "Energy-saving algorithms"],
    },
    {
        title: "Integrated Monitoring Function",
        text: "Built-in sensors and monitoring capabilities provide real-time performance data and predictive maintenance insights for optimal operation.",
        icon: <Brain className="w-6 h-6 text-blue-600" />,
        benefits: ["Real-time performance monitoring", "Predictive maintenance alerts", "Comprehensive diagnostics"],
    },
    {
        title: "Easy Installation and Connection",
        text: "Streamlined installation process with plug-and-play connectivity reduces setup time and minimizes integration complexity.",
        icon: <Zap className="w-6 h-6 text-accent" />,
        benefits: ["Plug-and-play design", "Universal mounting options", "Simplified wiring"],
    },
    {
        title: "Expanded Functionality",
        text: "Advanced control features and communication protocols enable seamless integration with building management systems and IoT platforms.",
        icon: <ThermometerSun className="w-6 h-6 text-purple-600" />,
        benefits: ["Multiple communication protocols", "BMS integration ready", "IoT connectivity"],
    },
    {
        title: "Compact Construction",
        text: "Space-efficient design maximizes performance while minimizing footprint, perfect for modern building constraints and retrofits.",
        icon: <AirVent className="w-6 h-6 text-orange-600" />,
        benefits: ["Space-saving design", "Lightweight construction", "Retrofit-friendly"],
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
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
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
        emblaApi.on("reInit", onSelect); // In case of re-initialization
        onSelect(); // Set initial state

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi]);


    const scrollToRef = (ref) => {
        if (ref) {
            const element = ref.current;
            if (element) {
                const offset = 20; // Navbar height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
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

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleNavClick = (scrollFunction: () => void) => {
        scrollFunction();
        setIsDrawerOpen(false);
    };

    return (
        <div className="min-h-screen w-full font-inter bg-white py-0">
            <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleDrawer}
                                className="md:hidden text-gray-600 hover:text-primary transition-colors"
                                aria-label="Toggle menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <button
                                onClick={scrollToTop}
                                className="text-lg md:text-xl font-bold text-primary hover:text-accent transition-colors md:block hidden"
                            >
                                GarvataAI
                            </button>
                        </div>
                        {/* Mobile Logo */}
                        <button
                            onClick={scrollToTop}
                            className="text-lg font-bold text-primary hover:text-accent transition-colors md:hidden absolute left-1/2 transform -translate-x-1/2"
                        >
                            GarvataAI
                        </button>
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-2 md:space-x-8 text-sm md:text-base">
                            <button
                                onClick={() => scrollToRef(howItComparesRef)}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                How It Compares
                            </button>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <button
                                onClick={() => scrollToRef(howItWorksRef)}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                How It Works
                            </button>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <button
                                onClick={() => scrollToRef(ecFansref)}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                EC Fans
                            </button>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <button
                                onClick={() => scrollToRef(keyBenefitsRef)}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                Key Features
                            </button>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <button
                                onClick={() => scrollToRef(contactRef)}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                Get in Touch!
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={scrollToTop}
                            className="text-lg font-bold text-primary hover:text-accent transition-colors"
                        >
                            Garvata
                        </button>
                        <button
                            onClick={toggleDrawer}
                            className="text-gray-600 hover:text-primary transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={() => handleNavClick(() => scrollToRef(howItComparesRef))}
                            className="text-gray-600 hover:text-primary transition-colors text-left py-2"
                        >
                            How It Compares
                        </button>
                        <button
                            onClick={() => handleNavClick(() => scrollToRef(howItWorksRef))}
                            className="text-gray-600 hover:text-primary transition-colors text-left py-2"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => handleNavClick(() => scrollToRef(ecFansref))}
                            className="text-gray-600 hover:text-primary transition-colors text-left py-2"
                        >
                            EC Fans
                        </button>
                        <button
                            onClick={() => handleNavClick(() => scrollToRef(keyBenefitsRef))}
                            className="text-gray-600 hover:text-primary transition-colors text-left py-2"
                        >
                            Key Features
                        </button>
                        <button
                            onClick={() => handleNavClick(() => scrollToRef(contactRef))}
                            className="text-gray-600 hover:text-primary transition-colors text-left py-2"
                        >
                            Get in Touch!
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={toggleDrawer}
                />
            )}

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
                        <span className="text-primary">AI-Powered Autonomy.</span>
                        <br />
                        Save on energy, prevent downtime and achieve effortless efficiency.
                    </p>
                    <button
                        onClick={() => scrollToRef(contactRef)}
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
                ref={howItComparesRef}
                className="container max-w-6xl mx-auto px-4 py-24"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        How It Compares
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See how our solution stacks up against traditional approaches
                    </p>
                </div>
                <div className="overflow-x-auto rounded-2xl shadow-lg relative">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-5 gap-2 bg-white/50 backdrop-blur-sm">
                            <div className="p-2 rounded-tl-xl flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <h3 className="font-bold text-gray-900">Features</h3>
                            </div>
                            <div className="bg-gray-50 p-2 flex items-center justify-center">
                                <h3 className="font-bold text-gray-900">Axial Fan + VFD</h3>
                            </div>
                            <div className="bg-gray-50 p-2 flex items-center justify-center">
                                <h3 className="font-bold text-gray-900">Plug Fan + VFD</h3>
                            </div>
                            <div className="bg-gray-50 p-2 flex items-center justify-center">
                                <h3 className="font-bold text-gray-900">EC Fan Only</h3>
                            </div>
                            <div className="bg-primary/5 p-2 rounded-tr-xl flex items-center justify-center">
                                <h3 className="font-bold text-primary">EC Fan + GarvataAI</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Energy Saving
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <p className="text-gray-600">-----</p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <p className="text-gray-600">upto 20%</p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <p className="text-gray-600">upto 35%</p>
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <p className="text-primary font-medium">upto 60%</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Preventive Maintenance
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Autonomous Operation
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Energy Saving through Preventive Maintenance
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <p className="text-primary font-medium text-center">
                                    YES upto 10%
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Demand-controlled ventilation (DCV)
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Single Point of Failure
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-green-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Motor Input Like Temp
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Regular Alerts
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-primary/5 p-2 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
                            <div className="p-2 rounded-bl-xl flex items-center justify-center sticky left-0 z-10 bg-gray-100">
                                <p className="font-medium text-gray-900 text-center">
                                    Operation Tickets
                                </p>
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-white p-2 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="bg-primary/5 p-2 rounded-br-xl flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={howItWorksRef}
                className="container max-w-5xl mx-auto px-4 pb-24 pt-24"
            >
                <div className="rounded-2xl glass-morphism shadow-glass bg-white/70 p-8 md:p-12 flex flex-col gap-8 animate-fade-in-up">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">
                            How It Works
                        </h2>
                        <p className="text-gray-700 max-w-3xl mx-auto">
                            Our intelligent system creates a seamless network of AHUs (Air
                            Handling Units) connected through edge devices to our AI-powered
                            controller, enabling autonomous operation and cloud-based
                            monitoring.
                        </p>
                    </div>

                    {/* Description Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <AirVent className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">AHU Network</h3>
                            <p className="text-gray-700 text-sm">
                                Multiple AHUs are equipped with EC fans and sensors, each
                                connected to its dedicated Garvata Edge Device for
                                real-time monitoring and control.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Edge Intelligence
                            </h3>
                            <p className="text-gray-700 text-sm">
                                The edge device act as smart intermediaries, facilitating communication
                                between AHUs, EC fans, and our AI Controller while ensuring
                                reliable operation even during network interruptions.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="bg-accent/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <Brain className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">AI Controller</h3>
                            <p className="text-gray-700 text-sm">
                                Our central AI Agent processes data from all edge devices, making
                                intelligent decisions for optimal performance, energy
                                efficiency, and preventive maintenance across the entire system.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <Cloud className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Cloud Integration
                            </h3>
                            <p className="text-gray-700 text-sm">
                                The Garvata Cloud platform provides comprehensive monitoring,
                                analytics, and remote management capabilities while continuously
                                improving system performance through machine learning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={ecFansref} className="bg-gray-50 py-24 pt-16">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Garvata EC Fans
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our EC fans deliver superior performance with German engineering excellence,
                            providing unmatched efficiency and reliability for your HVAC systems
                        </p>
                        <div className="grow mx-auto px-2 py-2 max-w-[50rem] landscape-max-w-wide">
                            <div className="h-full w-full flex flex-wrap gap-4 justify-center">
                                {images.map((src, index) => (
                                    <div className="flex landscape-hidden border-[0.4rem] rounded-lg border-black md:w-[15rem] w-[10rem] h-[10rem] bg-red-500">
                                        <img
                                            key={index}
                                            src={src}
                                            alt="Garvata EC Fan"
                                            className="w-full object-cover grayscale-0 hover:grayscale transition duration-300 ease-in-out shadow-lg"
                                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={keyBenefitsRef} className="bg-gray-50 py-24 pt-32">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Key Features
                        </h2>
                        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                            <button onClick={scrollPrev} disabled={prevBtnDisabled} className="cursor-pointer text-primary hover:text-accent transition-colors w-10 h-10 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
                                <CircleChevronLeft className="w-full h-full" />
                            </button>
                            <div className="embla overflow-hidden w-full" ref={emblaRef}>
                                <div className="embla__container flex">
                                    {carouselCards.map((card) => (
                                        <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_calc(100%/3)] min-w-0 p-2 sm:p-4" key={card.title}>
                                            <ECFanCard {...card} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button onClick={scrollNext} disabled={nextBtnDisabled} className="cursor-pointer text-primary hover:text-accent transition-colors w-10 h-10 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
                                <CircleChevronRight className="w-full h-full" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={contactRef}
                className="container max-w-3xl mx-auto px-4 py-24 pt-32"
            >
                <div className="rounded-2xl glass-morphism shadow-glass bg-white/70 p-12 md:p-16 animate-fade-in-up">
                    <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-900">
                        Get in Touch!
                    </h2>
                    <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-12 md:gap-16">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Email</h3>
                                <p className="text-gray-600">
                                    <a href="mailto:info@garvata.com">info@garvata.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">X (Twitter)</h3>
                                <p className="text-gray-600">
                                    <a
                                        href="https://x.com/garvataHQ"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        @garvataHQ
                                    </a>
                                </p>
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
