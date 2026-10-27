// Shape of the investor deck. The content itself is confidential: it lives in
// netlify/functions/investor-deck/content.ts and is only returned by that
// function after the passcode checks out, so it never ships in the site
// bundle. Only these types are shared with the page that renders it.

export type Step = { name: string; detail: string };
export type Logo = { name: string; src: string; width: number; height: number };
type Image = { src: string; alt: string };

// Slide titles are two-tone like the site's headings: `title`, then
// `accent` in the brand colour. `label` is the section eyebrow above it.
type Titled = { title: string; accent?: string; label?: string };

export type Slide =
  | { kind: "cover"; title: string; accent: string; subtitle: string }
  | (Titled & {
      kind: "problem";
      heading: string;
      // Each point names the schematic drawn beside it (slides.tsx).
      points: { text: string; visual: "static" | "reactive" | "silos" | "uncoordinated" }[];
      stat: string;
    })
  | (Titled & {
      kind: "system";
      root: string;
      branches: { name: string; leaves: string[] }[];
      statement: string;
    })
  | (Titled & {
      kind: "market";
      market: {
        eyebrow: string;
        bars: { year: string; value: number; label: string }[];
        cagr: string;
      };
      savings: {
        eyebrow: string;
        headline: string;
        headlineLabel: string;
        chain: { value: string; label: string }[];
        rate: { value: string; label: string };
        annual: string;
      };
      footnote: string;
    })
  | (Titled & {
      kind: "pillars";
      pillars: { label: string; heading: string; text?: string }[];
      // Joined with "+": the parts that make up Cooling OS.
      flow: Step[];
      statement: string;
    })
  | (Titled & {
      kind: "architecture";
      layers: { name: string; role: string; points: string[]; tag: string; highlight?: boolean }[];
      image: Image;
      equipment: { heading: string; text: string };
      flow: string;
    })
  | (Titled & {
      kind: "control-loop";
      inputs: string[];
      context: string;
      core: { name: string; text: string };
      executor: string;
      outputs: string[];
      objective: string;
    })
  | (Titled & {
      kind: "benefits";
      // Each item names the schematic drawn above it (slides.tsx); an item
      // can lead with a figure instead.
      items: {
        title: string;
        value?: string;
        visual: "energy" | "capacity" | "coordination" | "autonomy" | "guardrails" | "edge";
      }[];
    })
  | (Titled & {
      kind: "ecosystem";
      agent: { eyebrow: string; name: string; text: string };
      hardware: { eyebrow: string; groups: { label: string; items: string; image: Image }[] };
    })
  | (Titled & {
      kind: "products";
      products: { eyebrow: string; name: string; text: string; image: Image }[];
      flow: string;
    })
  | (Titled & {
      kind: "roadmap";
      rows: { product: string; timeline: string; remarks: string; done?: boolean }[];
    })
  | (Titled & {
      kind: "competition";
      software: { eyebrow: string; heading: string };
      hardware: {
        label: string;
        segments: { name: string; text: string; players: string[] }[];
      }[];
    })
  | (Titled & {
      kind: "traction";
      stats: { value: string; label: string }[];
      partner: { eyebrow: string; heading: string; text?: string; logo: Logo };
      others: { eyebrow: string; logos: Logo[] };
    })
  | (Titled & {
      kind: "team";
      founders: {
        initials: string;
        name: string;
        role: string;
        bio: string[];
        tags: string[];
        linkedin: string;
      }[];
    })
  | (Titled & {
      kind: "funding";
      raise: { eyebrow: string; amount: string; round: string };
      uses: { title: string; text: string }[];
    })
  | {
      kind: "closing";
      title: string;
      contact: { eyebrow: string; name: string; role: string; phone: string; email: string };
    };

export type DeckContent = { title: string; footer: string; slides: Slide[] };

// Click-through builds per slide (src/components/deck/slides.tsx draws each
// step); most slides show everything at once.
const builds: Partial<Record<Slide["kind"], number>> = {
  pillars: 2,
  architecture: 3,
  "control-loop": 6,
};
export const buildSteps = (slide: Slide) => builds[slide.kind] ?? 1;
