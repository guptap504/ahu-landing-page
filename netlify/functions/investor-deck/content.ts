import type { DeckContent } from "../../../src/content/deck";
import { coolingOsSlides } from "../../lib/coolingOsSlides";
import { cbre, energeia, jci } from "./logos";

// Investor deck: Garvata Labs Investor Pitch Deck V1 (October 2026) for
// presenting online. Confidential — only returned by investor-deck.ts once the
// passcode checks out. Edit slides here, and the five problem and Cooling OS
// slides shared with the product deck in netlify/lib/coolingOsSlides.ts; the
// page at /investors renders them.
export const deck: DeckContent = {
  title: "Autonomous Cooling for Data Centers",
  footer: "Garvata Labs · Confidential",
  slides: [
    {
      kind: "cover",
      title: "Autonomous cooling",
      accent: "for data centers",
      subtitle: "Cooling OS · EC fans · CRAC/CRAH · CDU",
      note: "Investor presentation · Confidential",
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
    // The problem, where Cooling OS has to work, then Cooling OS itself. For
    // investors the halls also sit on Garvata's own hardware, which takes the
    // place of the closing statement on that slide.
    ...coolingOsSlides.map((slide) =>
      slide.kind === "coverage"
        ? {
            ...slide,
            statement: undefined,
            hardware: { name: "Garvata cooling hardware", detail: "EC fans · CRAH / CRAC · CDU" },
          }
        : slide,
    ),
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
        text: "Digital twin, DCIM and agent in one supervisory layer over the BMS: optimisation, coordination and safety checks.",
        tag: "Anticipate · Close the loop · Control",
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
        { product: "Garvata DCIM", timeline: "Done", remarks: "Part of Cooling OS; open source", done: true },
        {
          product: "Garvata Cooling OS",
          timeline: "Dec 2026",
          remarks: "Digital twin and agent under development; in discussion with a few data centers",
        },
        { product: "Garvata EC motor", timeline: "Mar 2027", remarks: "Localisation in progress; contract manufacturing" },
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
