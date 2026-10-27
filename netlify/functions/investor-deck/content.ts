import type { DeckContent } from "../../../src/content/investorDeck";
import { cbre, energeia, jci } from "./logos";

// Investor deck: Garvata Labs Investor Pitch Deck V1 (October 2026) for
// presenting online. Confidential — only returned by investor-deck.ts once the
// passcode checks out. Edit slides here; the page at /investors renders them.
export const deck: DeckContent = {
  title: "Autonomous Cooling for Data Centers",
  footer: "Garvata Labs · Confidential",
  slides: [
    {
      kind: "cover",
      title: "Autonomous cooling",
      accent: "for data centers",
      subtitle: "Cooling OS · EC fans · CRAC/CRAH · CDU",
    },
    {
      kind: "team",
      label: "Team",
      title: "Founders",
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
      kind: "problem",
      label: "Problem",
      title: "Inefficient and broken cooling",
      accent: "cannot manage AI demand",
      heading: "Rule-based modulation, inefficient operations, no coordination",
      points: [
        { text: "Static rules for cooling control", visual: "static" },
        { text: "A reactive approach", visual: "reactive" },
        { text: "Controls available in silos", visual: "silos" },
        { text: "No system coordination", visual: "uncoordinated" },
      ],
      stat: "Compute and energy losses due to broken cooling",
    },
    {
      kind: "system",
      label: "Solution",
      title: "What does the cooling system",
      accent: "look like?",
      root: "Autonomous cooling",
      branches: [
        {
          name: "Retrofit, mainly air cooling",
          leaves: ["Supervisory layer with AI-driven decision making", "Control with intelligent hardware"],
        },
        {
          name: "Future hybrid (air + liquid) cooling",
          leaves: ["Supervisory layer with AI-driven decision making", "Control with intelligent hardware"],
        },
      ],
      statement:
        "A truly intelligent cooling ecosystem that combines AI-driven decision making with intelligent hardware to deliver autonomous, efficient and future-ready cooling.",
    },
    {
      kind: "pillars",
      label: "Solution",
      title: "Garvata Cooling OS:",
      accent: "for liquid and air cooling",
      pillars: [
        {
          label: "Predictive",
          heading: "Anticipate thermal risk",
          text: "Forecasts thermal load on the racks and proposes efficient setpoints before conditions drift.",
        },
        {
          label: "Coordination",
          heading: "Operate the room as one system",
          text: "Manages every cooling device together to reduce unit fighting, reheat and airflow imbalance.",
        },
        {
          label: "Control",
          heading: "Closed-loop, multi-parameter control",
          text: "Modulates fans, valves and cooling capacity against rack-inlet conditions, not a single room signal.",
        },
      ],
      flow: [
        { name: "Digital twin", detail: "Anticipates thermal conditions" },
        { name: "HVAC agent", detail: "Decision + execution" },
      ],
      statement:
        "Manage complex cooling systems as one operating layer: improve efficiency, reliability and compute capacity.",
    },
    {
      kind: "control-loop",
      label: "Solution",
      title: "Garvata Cooling OS:",
      accent: "how it will work",
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
      context: "Data center infrastructure management (DCIM)",
      core: { name: "Garvata Cooling OS", text: "Supervisory + control layer" },
      executor: "Building management system (BMS)",
      outputs: [
        "Fresh-air damper %",
        "Chilled-water valve %",
        "EC fan RPM",
        "Pump motor RPM",
        "CRAC/CRAH setpoints",
      ],
      objective: "Improve compute capacity and availability, and minimise energy use",
    },
    {
      kind: "architecture",
      label: "Solution",
      title: "Where Cooling OS sits in the",
      accent: "data center architecture",
      layers: [
        {
          name: "DCIM",
          role: "Workload + rack context",
          points: ["Rack locations", "IT / rack load", "Cooling requirement", "Capacity / asset context"],
          tag: "Rack context",
        },
        {
          name: "Garvata Cooling OS",
          role: "Agentic control layer powered by a digital twin",
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
      kind: "benefits",
      label: "Value and benefits",
      title: "Garvata AI ecosystem:",
      accent: "value and benefits",
      items: [
        { value: "Up to 25%", title: "Energy saving", visual: "energy" },
        { title: "Increased compute capacity and availability", visual: "capacity" },
        { title: "Coordinated heat management across the data center", visual: "coordination" },
        { title: "Autonomous operations", visual: "autonomy" },
        { title: "Security guardrails", visual: "guardrails" },
        { title: "Edge intelligence", visual: "edge" },
      ],
    },
    {
      kind: "ecosystem",
      label: "Value and benefits",
      title: "Garvata Labs ecosystem:",
      accent: "AI agent with intelligent hardware",
      agent: {
        eyebrow: "01 · AI agent",
        name: "Garvata Cooling OS",
        text: "Supervisory software over DCIM and BMS data: optimisation, coordination and safety checks.",
      },
      hardware: {
        eyebrow: "02 · Intelligent hardware",
        groups: [
          {
            label: "Air cooling",
            items: "EC fans and CRAH units",
            image: { src: "/products/ec-fan.webp", alt: "Garvata EC plug fan" },
          },
          {
            label: "Liquid cooling",
            items: "Coolant distribution units (CDUs)",
            image: { src: "/products/cdu.webp", alt: "Coolant distribution unit concept render" },
          },
        ],
      },
    },
    {
      kind: "products",
      label: "Products",
      title: "Garvata Labs ecosystem:",
      accent: "intelligent hardware",
      products: [
        {
          eyebrow: "Air cooling",
          name: "EC fan",
          text: "High-efficiency centrifugal fan; Modbus-controlled",
          image: { src: "/products/ec-fan.webp", alt: "Garvata EC plug fan" },
        },
        {
          eyebrow: "Air cooling",
          name: "CRAC / CRAH",
          text: "Precision air cooling with inbuilt unit coordination",
          image: { src: "/products/precision-cooling-unit.webp", alt: "Precision cooling unit concept render" },
        },
        {
          eyebrow: "Liquid cooling",
          name: "CDU",
          text: "Coolant distribution units for efficient liquid cooling",
          image: { src: "/products/cdu.webp", alt: "Coolant distribution unit concept render" },
        },
      ],
      flow: "Software learns the site → Garvata equipment closes the loop → better heat management → more energy saved",
    },
    {
      kind: "roadmap",
      label: "Products",
      title: "Garvata AI ecosystem:",
      accent: "roadmap",
      rows: [
        { product: "Garvata EC fans", timeline: "Deployed", remarks: "With imported motor", done: true },
        { product: "Garvata Cooling OS", timeline: "Dec 2026", remarks: "Under development; in discussion with a few data centers" },
        { product: "Garvata Cooling OS with DCIM", timeline: "Mar 2027", remarks: "DCIM as open source" },
        { product: "Garvata EC motor", timeline: "Mar 2027", remarks: "Contract manufacturing" },
        { product: "Garvata EC fan", timeline: "Oct 2027", remarks: "In-house manufacturing set up" },
        { product: "Garvata CRAH units", timeline: "Dec 2027", remarks: "" },
        { product: "Garvata CRAC and CDU units", timeline: "Aug 2028", remarks: "Liquid cooling introduction" },
      ],
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
        headlineLabel: "average power savings potential",
        chain: [
          { value: "~108 GW", label: "facility load" },
          { value: "~18 GW", label: "non-IT overhead" },
          { value: "~5 GW", label: "air cooling + chiller pumps" },
        ],
        rate: { value: "20%", label: "saving vs rule-based control" },
        annual: "~9 TWh a year can be saved in 2030",
      },
      footnote:
        "Global projected saving at current (2026) data center consumption. By 2030 it will be 3x.",
    },
    {
      kind: "competition",
      label: "Incumbents",
      title: "Competitor",
      accent: "landscape",
      software: {
        eyebrow: "Garvata AI Cooling OS market",
        heading: "Agentic cooling is a new category",
      },
      hardware: [
        {
          label: "Air cooling",
          segments: [
            {
              name: "EC fans",
              text: "Two dominant players hold 80–90% of the market",
              players: ["ebm-papst", "Ziehl-Abegg"],
            },
            {
              name: "CRAC and CRAH units",
              text: "Multiple players",
              players: ["Vertiv", "Schneider", "Stulz", "Samsung"],
            },
          ],
        },
        {
          label: "Liquid cooling",
          segments: [
            {
              name: "CDUs",
              text: "Multiple players",
              players: ["Vertiv", "Schneider", "Delta", "ZutaCore"],
            },
          ],
        },
      ],
    },
    {
      kind: "traction",
      label: "Traction & partnerships",
      title: "Traction",
      stats: [
        { value: "3", label: "Pilots" },
        { value: "14", label: "EC fans deployed" },
        { value: "₹28 lakh", label: "Revenue" },
        { value: "500+ fans", label: "₹9 crore indicated pipeline" },
      ],
      partner: {
        eyebrow: "Garvata Labs and JCI India partnership",
        heading: "Exclusive partnership for Garvata Cooling OS and EC fans",
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
      kind: "funding",
      label: "Funding",
      title: "Fund requirement",
      accent: "and deployment",
      raise: { eyebrow: "Current raise", amount: "INR 7 Cr", round: "Pre-seed round" },
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
    },
    {
      kind: "closing",
      title: "Thank you",
      contact: {
        eyebrow: "Reach us",
        name: "Kunal Chaturvedi",
        role: "Co-founder",
        phone: "+91 85272 05934",
        email: "kunal@garvata.com",
      },
    },
  ],
};
