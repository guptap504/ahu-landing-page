// Contact page copy per entry point. Links to /contact carry `?from=<context>`
// so the page can match where the visitor came from, and the enquiry email
// is tagged with the same value.

export type ContactContext =
  | "data-centers"
  | "commercial"
  | "pharma"
  | "products"
  | "calculate"
  | "demo";

type ContactCopy = { title: string; accent: string; description: string };

export const defaultContactCopy: ContactCopy = {
  title: "Talk to us about",
  accent: "your site",
  description:
    "Tell us what you're cooling — a data hall, an IT park or a production floor — and we'll show you what Garvata would change and what it would save.",
};

export const contactCopy: Record<ContactContext, ContactCopy> = {
  "data-centers": {
    title: "Join the",
    accent: "Cooling OS pilot",
    description:
      "We're taking on a small number of pilot sites ahead of general availability. Tell us about your site — IT load, cooling units, BMS and DCIM — and we'll follow up.",
  },
  commercial: {
    title: "Ready to reduce",
    accent: "your energy costs?",
    description:
      "We'll walk you through a live system and show you the numbers for your building.",
  },
  pharma: {
    title: "Talk to us about",
    accent: "your production site",
    description:
      "Tell us about your clean rooms, labs and the AHUs that serve them — the pressure, temperature and humidity they need to hold. We'll show you where Garvata can save energy without touching what has to stay fixed.",
  },
  products: {
    title: "Find the right",
    accent: "products for your site",
    description:
      "Tell us what you're cooling and we'll recommend the right mix of software and equipment — and show you what it would save.",
  },
  calculate: {
    title: "Turn the estimate",
    accent: "into a plan",
    description:
      "Send us your AHU schedule or export and we'll validate the fan selection, check site conditions and confirm the numbers for your building.",
  },
  demo: {
    title: "Want a walkthrough",
    accent: "on your own site?",
    description:
      "We'll show you the platform running on live AHUs and what it would change for your building.",
  },
};

export const isContactContext = (value: string | null): value is ContactContext =>
  !!value && value in contactCopy;

// Which contact context a page belongs to, if any.
export function contextForPath(pathname: string): ContactContext | undefined {
  const [section, sub] = pathname.split("/").filter(Boolean);
  if (section === "solutions" && isContactContext(sub ?? null)) return sub as ContactContext;
  if (isContactContext(section ?? null)) return section as ContactContext;
  return undefined;
}

export function contactHref(context?: ContactContext) {
  return context ? `/contact?from=${context}` : "/contact";
}
