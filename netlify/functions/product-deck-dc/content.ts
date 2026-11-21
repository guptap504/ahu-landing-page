import type { DeckContent } from "../../../src/content/deck";

// Cooling OS product deck for data centers: the software half of the investor
// deck, with Cooling OS positioned as digital twin + DCIM + agent. No team,
// hardware roadmap, market, traction or funding slides. Confidential — only returned by
// product-deck-dc.ts once the passcode checks out. Edit slides here; the page
// at /product-deck-dc renders them.
export const deck: DeckContent = {
  title: "Garvata Cooling OS for Data Centers",
  footer: "Garvata Labs · Confidential",
  slides: [
    {
      kind: "cover",
      title: "Autonomous cooling",
      accent: "for data centers",
      subtitle: "Garvata Cooling OS · Digital twin + DCIM + agent",
      note: "Product presentation · Confidential",
    },
    {
      // Five gaps, answered by the three principles on the Cooling OS slide:
      // 01–02 by anticipate, 03 by close the loop, 04–05 by multi-parameter
      // control.
      kind: "problem",
      label: "Problem",
      title: "Inefficient and broken cooling",
      accent: "cannot manage AI demand",
      heading: "Rule-based and reactive, with no feedback and no coordination",
      points: [
        {
          text: "Static rules",
          detail: "Fixed rules for cooling control ignore how the load is changing.",
          visual: "static",
        },
        {
          text: "No anticipation",
          detail: "Cooling responds only after the heat has reached the racks.",
          visual: "reactive",
        },
        {
          text: "No closed loop",
          detail: "Nothing links a cooling action to the response it gets at the racks.",
          visual: "open-loop",
        },
        {
          text: "Controls in silos",
          detail: "Fans, valves and pumps each run their own loop, one parameter at a time.",
          visual: "single-loops",
        },
        {
          text: "No system coordination",
          detail: "Units work against each other. Nothing manages the facility's cooling as a whole.",
          visual: "uncoordinated",
        },
      ],
      stat: "Compute and energy losses due to broken cooling",
    },
    {
      kind: "coverage",
      label: "Solution",
      title: "One Cooling OS for",
      accent: "retrofit and new hybrid halls",
      layer: { name: "Garvata Cooling OS", detail: "One operating layer" },
      sites: [
        {
          label: "Retrofit",
          heading: "Primarily air cooled",
          text: "Existing halls, cooled by CRAH and CRAC units.",
          equipment: ["CRAH / CRAC units", "EC fans", "Chilled-water valves and pumps"],
        },
        {
          label: "New hybrid",
          heading: "Air + liquid cooled",
          text: "New halls, where liquid cooling runs alongside air.",
          equipment: ["CRAH / CRAC units", "CDUs", "Liquid loops"],
          liquid: true,
        },
      ],
      statement: "The same digital twin, DCIM and agent run both: the hall changes, the operating layer does not.",
    },
    {
      kind: "pillars",
      label: "Solution",
      title: "Garvata Cooling OS:",
      accent: "digital twin + DCIM + agent",
      pillars: [
        {
          label: "Anticipate",
          heading: "Anticipate thermal risk",
          text: "Forecasts thermal load on the racks and proposes efficient setpoints before conditions drift.",
        },
        {
          label: "Close the loop",
          heading: "Link every action to its response",
          text: "Rack-level load and inlet conditions show what each cooling action did, and feed the next decision.",
        },
        {
          label: "Multi-parameter control",
          heading: "Manage the entire facility's cooling",
          text: "Modulates fans, valves and cooling capacity together across every unit, not one device or one room signal at a time.",
        },
      ],
      // One part per principle, in the same order.
      flow: [
        { name: "Digital twin", detail: "Anticipates thermal conditions" },
        { name: "DCIM", detail: "Closes the loop from action to response" },
        { name: "Agent", detail: "Decides and executes across the facility" },
      ],
      // Last build: the three parts together are what we call Cooling OS.
      umbrella: "Garvata Cooling OS",
      statement:
        "Manage complex cooling systems as one operating layer: improve efficiency, reliability and compute capacity.",
    },
    {
      kind: "closed-loop",
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
      core: {
        name: "Garvata Cooling OS",
        // DCIM comes last: the response from the racks returns through it.
        parts: [
          { name: "Digital twin", detail: "Anticipates" },
          { name: "Agent", detail: "Multi-parameter control" },
          { name: "DCIM", detail: "Closes the loop" },
        ],
      },
      executor: "Building management system (BMS)",
      outputs: [
        "Fresh-air damper %",
        "Chilled-water valve %",
        "EC fan RPM",
        "Pump motor RPM",
        "CRAC/CRAH setpoints",
      ],
      feedback: { name: "Response at the racks", detail: "Rack inlet temperature · IT load" },
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
          tag: "Close the loop",
        },
        {
          name: "Digital twin + agent",
          role: "Agentic control layer powered by a digital twin",
          points: ["Turns context into coordinated action"],
          tag: "Anticipate · Control",
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
      umbrella: { name: "Garvata Cooling OS", detail: "DCIM + digital twin + agent" },
      image: { src: "/products/precision-cooling-unit.webp", alt: "Precision cooling unit concept render" },
      equipment: {
        heading: "Equipment layer",
        text: "Garvata controller + EC fan array + intelligent controls",
      },
      flow: "Digital twin anticipates → agent proposes → BMS executes → DCIM closes the loop",
    },
    {
      kind: "benefits",
      label: "Value and benefits",
      title: "Garvata Cooling OS:",
      accent: "value and benefits",
      items: [
        { value: "Up to 25%", title: "Energy saving", visual: "energy" },
        { title: "Increased compute capacity and availability", visual: "capacity" },
        { title: "Coordinated heat management across the data center", visual: "coordination" },
        { title: "Autonomous operations", visual: "autonomy" },
        { title: "Security guardrails", visual: "guardrails" },
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
