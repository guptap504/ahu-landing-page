import type { DeckContent } from "../../../src/content/deck";
import { coolingOsSlides } from "../../lib/coolingOsSlides";

// Cooling OS product deck for data centers: the software half of the investor
// deck, with Cooling OS positioned as digital twin + DCIM + agent. No team,
// hardware roadmap, market, traction or funding slides. Confidential — only
// returned by product-deck-dc.ts once the passcode checks out. Edit slides
// here, and the five problem and Cooling OS slides shared with the investor
// deck in netlify/lib/coolingOsSlides.ts; the page at /product-deck-dc renders
// them.
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
    ...coolingOsSlides,
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
