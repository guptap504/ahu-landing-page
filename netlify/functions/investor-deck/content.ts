import type { DeckContent } from "../../../src/content/investorDeck";
import { cbre, energeia, jci } from "./logos";

// Investor deck: the data center pitch deck (August 2026) for presenting
// online. Confidential — only returned by investor-deck.ts once the passcode
// checks out. Edit slides here; the page at /investors renders them.
export const deck: DeckContent = {
  title: "Autonomous Cooling for Data Centers",
  footer: "Garvata Labs · Confidential",
  slides: [
    {
      kind: "cover",
      title: "Autonomous cooling",
      accent: "for data centers",
      subtitle: "Cooling OS · EC motors · EC fans · Precision cooling",
    },
    {
      kind: "problem",
      label: "Problem",
      title: "Inefficient, broken and short-supplied cooling",
      accent: "can’t manage AI demand",
      controls: {
        eyebrow: "Broken and inefficient controls",
        heading: "Rule-based modulation, inefficient operations, no coordination",
        points: [
          "Static rules for cooling control, primarily on return-air temperature",
          "All control is reactive, lagging the actual conditions at server intakes",
          "Control on either the fan or the compressor, never both",
          "No system coordination, leading to simultaneous humidification and dehumidification cycles",
        ],
        stat: "25%+ energy losses due to broken cooling",
      },
      supply: {
        eyebrow: "A handful of manufacturers",
        heading: "Huge demand; supply has become a bottleneck",
        points: [
          { text: "Advanced cooling hardware for data centers has become a severe supply bottleneck" },
          { text: "Specialised cooling distribution units face lead times that stretch manufacturing capacity to its limits" },
          { text: "Three players hold most of the precision-cooling market. There is no Indian-owned CRAC, CRAH or CDU OEM." },
          {
            text: "EC fans are German-dominated, and supply is a bottleneck because of huge demand. EC fan lead time in India is now 53 weeks.",
            emphasis: true,
          },
        ],
        footer: "No Indian-owned player in precision cooling hardware.",
      },
      result:
        "The result: heat mismanagement, energy waste, supply constraints and long deployment cycles.",
    },
    {
      kind: "market",
      label: "Market",
      title: "Market opportunity for the",
      accent: "cooling ecosystem",
      market: {
        eyebrow: "CRAC/CRAH market (US$)",
        bars: [
          { year: "2025", value: 5.03, label: "$5.03B" },
          { year: "2034", value: 14.51, label: "$14.51B" },
        ],
        cagr: "12.6% CAGR",
      },
      savings: {
        eyebrow: "Software and control opportunity (GW saved)",
        headline: "~1 GW",
        headlineLabel: "average power savings potential by 2030",
        chain: [
          { value: "~108 GW", label: "global facility load, 2030" },
          { value: "~18 GW", label: "non-IT overhead" },
          { value: "~5 GW", label: "air cooling + chiller pumps" },
        ],
        rate: { value: "20%", label: "saving vs rule-based control" },
        annual: "~9 TWh a year can be saved by 2030",
      },
      footnote:
        "Based on projected 2030 global data center load: ~108 GW, or about 945 TWh a year, in line with the IEA’s 2030 projection.",
    },
    {
      kind: "pillars",
      label: "Solution",
      title: "Cooling OS:",
      accent: "control + coordination + prediction",
      pillars: [
        {
          label: "Predictive",
          heading: "Anticipate thermal risk",
          text: "Uses Garvata HVAC AI to forecast hot spots and propose efficient setpoints before conditions drift.",
        },
        {
          label: "Coordination",
          heading: "Operate the room as one system",
          text: "Coordinates CRAC and CRAH units to reduce unit fighting, reheat and airflow imbalance.",
        },
        {
          label: "Control",
          heading: "Closed-loop, multi-parameter control",
          text: "Modulates fans, valves and cooling capacity against rack-inlet conditions, not a single room signal.",
        },
      ],
      flow: [
        { name: "Digital twin", detail: "Anticipates thermal conditions" },
        { name: "HVAC agent", detail: "Decides and executes" },
        { name: "Safety checker", detail: "Validates limits" },
      ],
      statement:
        "Manage complex cooling systems as one operating layer: improve efficiency, reliability and compute capacity.",
    },
    {
      kind: "architecture",
      label: "Solution",
      title: "Where Cooling OS sits in",
      accent: "data center architecture",
      layers: [
        {
          name: "DCIM",
          role: "Workload + rack context",
          points: ["Rack locations", "IT and rack load", "Cooling requirement", "Capacity and asset context"],
          tag: "Rack context",
        },
        {
          name: "Garvata Cooling OS",
          role: "Supervisory + control layer powered by a digital twin and HVAC agent",
          points: ["The operating layer that turns context into coordinated action"],
          tag: "Control · Coordinate · Predict",
          highlight: true,
        },
        {
          name: "BMS",
          role: "Safe local execution",
          points: ["Receives control setpoints", "Fan, valve and capacity commands", "Equipment state and alarms", "Local safety and PID loops"],
          tag: "Execution",
        },
        {
          name: "CRAC / CRAH / CDU",
          role: "Precision cooling",
          points: [],
          tag: "Equipment",
        },
      ],
      image: { src: "/products/precision-cooling-unit.webp", alt: "Precision cooling unit concept render" },
      equipment: {
        heading: "Equipment layer",
        text: "Garvata controller + EC fan array + intelligent controls",
      },
      flow: "DCIM supplies context → Cooling OS proposes → BMS executes → equipment closes the loop",
    },
    {
      kind: "control-loop",
      label: "Solution",
      title: "How Cooling OS",
      accent: "works",
      inputs: [
        "Return air temperature",
        "Supply air temperature",
        "Chilled water in",
        "Chilled water out",
        "CO₂",
        "Duct pressure",
        "Relative humidity",
        "Outside conditions",
      ],
      context: "DCIM: rack load and capacity",
      core: { name: "Garvata Cooling OS", text: "Supervisory + control layer" },
      executor: "Building management system (BMS)",
      outputs: [
        "Fresh-air damper %",
        "Chilled-water valve %",
        "EC fan RPM",
        "Pump motor RPM",
        "CRAC/CRAH setpoints",
      ],
      objective:
        "Manage heat dissipation and minimise energy use, heavily penalising any setpoint deviation",
    },
    {
      kind: "products",
      label: "Products",
      title: "The Garvata AI ecosystem:",
      accent: "Cooling OS and hardware",
      products: [
        {
          eyebrow: "Supervisory software",
          name: "Cooling OS",
          text: "DCIM and BMS data, optimisation, coordination and safety checks",
        },
        {
          eyebrow: "Localised component",
          name: "EC motor",
          text: "Motor engineering localises margin, lead time and IP",
          image: { src: "/products/ec-motor.webp", alt: "Garvata EC motor" },
        },
        {
          eyebrow: "Air movement",
          name: "EC fan",
          text: "High-efficiency centrifugal fan; Modbus-controlled",
          image: { src: "/products/ec-fan.webp", alt: "Garvata EC plug fan" },
        },
        {
          eyebrow: "Precision cooling unit",
          name: "CRAC / CRAH / CDU",
          text: "Garvata equipment layer with intelligent controls",
          image: { src: "/products/precision-cooling-unit.webp", alt: "Precision cooling unit concept render" },
        },
      ],
      flow: "Software learns the site → Garvata equipment closes the loop → better heat management → more energy saved",
    },
    {
      kind: "roadmap",
      label: "Products",
      title: "Product",
      accent: "roadmap",
      rows: [
        { product: "Garvata EC fans", timeline: "Deployed", remarks: "With imported motor", done: true },
        { product: "Garvata Cooling OS", timeline: "Dec 2026", remarks: "Under development; in discussion with several data centers" },
        { product: "Garvata Cooling OS with DCIM", timeline: "Mar 2027", remarks: "DCIM as open source" },
        { product: "Garvata EC motor", timeline: "Mar 2027", remarks: "Contract manufacturing" },
        { product: "Garvata EC fan", timeline: "Oct 2027", remarks: "In-house manufacturing set up" },
        { product: "Garvata CRAH units", timeline: "Dec 2027", remarks: "" },
        { product: "Garvata CRAC and CDU units", timeline: "Aug 2028", remarks: "Liquid cooling introduction" },
      ],
    },
    {
      kind: "competition",
      label: "Incumbents",
      title: "Competitor",
      accent: "landscape",
      software: {
        eyebrow: "Garvata AI Cooling OS market",
        heading: "Agentic cooling is a new market",
        points: [
          "Based on a digital twin and an HVAC LLM",
          "Autonomous cooling",
          "No market leader",
          "Google DeepMind and Phaidra are exploring agentic cooling",
        ],
      },
      share: {
        eyebrow: "Precision-cooling (hardware) market share",
        unit: "%",
        rows: [
          { name: "Vertiv", value: 27 },
          { name: "Schneider", value: 17 },
          { name: "Stulz", value: 16 },
          { name: "JCI / York", value: 10 },
          { name: "Airedale (Modine)", value: 10 },
          { name: "Others", value: 20 },
        ],
      },
      fans: {
        eyebrow: "EC fans · a separate market",
        name: "ebm-papst + Ziehl-Abegg",
        text: "A German-dominated EC-fan market: the motor and component layer beneath every CRAC/CRAH OEM above. A critical single point of import dependency for every unit sold; not counted in the OEM shares.",
      },
    },
    {
      kind: "traction",
      label: "Traction & partnerships",
      title: "Traction",
      accent: "to date",
      stats: [
        { value: "3", label: "Pilots completed" },
        { value: "14", label: "EC fans deployed" },
        { value: "₹28 lakh", label: "Revenue reported" },
        { value: "500+ fans", label: "₹9 crore indicated pipeline" },
      ],
      partner: {
        eyebrow: "JCI India deployment partnership",
        heading: "Garvata AI solution deployment with JCI India",
        text: "JCI India will deploy Garvata EC fans across its facilities. JCI can also deploy the CRAH; our current wedge is the EC fan.",
        logo: { name: "Johnson Controls", ...jci },
      },
      others: {
        eyebrow: "Other commercial relationships",
        logos: [
          { name: "CBRE", ...cbre },
          { name: "Energeia", ...energeia },
        ],
      },
    },
    {
      kind: "team",
      label: "Team",
      title: "Founders:",
      accent: "experience and capability to execute",
      founders: [
        {
          initials: "KC",
          name: "Kunal Chaturvedi",
          role: "Co-founder & CEO",
          bio: [
            "Second-time entrepreneur. 20+ years across automotive engineering, analytics and renewable energy. Headed product, customer success and operations.",
            "Back on the 0-to-1 journey: a foundational model for HVAC.",
          ],
          tags: ["Product", "Sales", "HVAC", "Energy"],
          linkedin: "https://www.linkedin.com/in/chaturvedikunal/",
        },
        {
          initials: "PG",
          name: "Prashant Gupta",
          role: "Co-founder & CTO",
          bio: [
            "Career in startups, building and scaling technology for large enterprises across geographies.",
            "AI, digital twins, data platforms, ML and DevOps, from writing the model to running it in production.",
          ],
          tags: ["Software", "AI / ML", "Hardware", "DevOps"],
          linkedin: "https://www.linkedin.com/in/prashg/",
        },
      ],
    },
    {
      kind: "funding",
      label: "Funding",
      title: "Fund requirement",
      accent: "and deployment",
      raise: { eyebrow: "Current raise", amount: "INR 7 Cr", round: "Angel round" },
      uses: [
        {
          title: "Engineering and deployment teams",
          text: "Teams for product design and development, and for Garvata AI and Garvata hardware deployment.",
        },
        {
          title: "Contract-manufacturing setup",
          text: "Finalise motor design, quality and performance, and complete the EC fan — not a greenfield plant.",
        },
        {
          title: "Core hires + focused sales",
          text: "A data-center-specific team to convert PoCs into repeat POs.",
        },
        {
          title: "Tech infrastructure, marketing and sales",
          text: "Tech infrastructure for the team, plus sales and marketing travel.",
        },
      ],
      contact: "hello@garvata.com",
    },
  ],
};
