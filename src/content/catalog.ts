import type { Availability } from "@/components/site/ui";

export type ProductId =
  | "cooling-os"
  | "ahu-control"
  | "ec-fans"
  | "ec-motor"
  | "precision-cooling";

export type Product = {
  id: ProductId;
  name: string;
  tagline: string;
  summary: string;
  status: Availability;
  image?: { src: string; alt: string; width: number; height: number };
};

export const products: Record<ProductId, Product> = {
  "cooling-os": {
    id: "cooling-os",
    name: "Garvata Cooling OS",
    tagline: "Supervisory control for the whole cooling system",
    summary:
      "Predicts thermal risk, coordinates every CRAC and CRAH as one system, and controls fans, valves and capacity.",
    status: "piloting",
  },
  "ahu-control": {
    id: "ahu-control",
    name: "GarvataAI AHU Control",
    tagline: "Autonomous control for air handling units",
    summary:
      "An edge controller per AHU, AI that tunes fan speed to live conditions, and a cloud dashboard to watch it all.",
    status: "available",
    image: {
      src: "/products/edge-controller.webp",
      alt: "Garvata edge controller",
      width: 1000,
      height: 750,
    },
  },
  "ec-fans": {
    id: "ec-fans",
    name: "Garvata EC Fans",
    tagline: "High-efficiency fans with monitoring built in",
    summary:
      "Direct-drive EC fans that deliver more airflow per watt and report their own speed, temperature, power and vibration.",
    status: "available",
    image: {
      src: "/products/ec-fan.webp",
      alt: "Garvata EC plug fan",
      width: 1000,
      height: 944,
    },
  },
  "ec-motor": {
    id: "ec-motor",
    name: "Garvata EC Motor",
    tagline: "Motor engineering, localised",
    summary:
      "Our own EC motor, engineered in India to bring down cost and lead time for EC fans.",
    status: "in-development",
    image: {
      src: "/products/ec-motor.webp",
      alt: "Garvata EC motor",
      width: 900,
      height: 863,
    },
  },
  "precision-cooling": {
    id: "precision-cooling",
    name: "Precision cooling units",
    tagline: "CRAH, CRAC and CDU with the controller built in",
    summary:
      "Planned Garvata precision cooling units with EC fan arrays and intelligent controls, built for Cooling OS.",
    status: "planned",
    image: {
      src: "/products/precision-cooling-unit.webp",
      alt: "Precision cooling unit concept render",
      width: 1000,
      height: 1007,
    },
  },
};

export type IndustryId = "data-centers" | "commercial" | "pharma";

export const industries: {
  id: IndustryId;
  tab: string;
  name: string;
}[] = [
  { id: "data-centers", tab: "Data Centers", name: "Data Centers" },
  { id: "commercial", tab: "IT Parks", name: "Commercial IT Parks" },
  { id: "pharma", tab: "Pharma", name: "Pharma Manufacturing" },
];

// Downloadable EC fan configuration sheets (Products page and footer).
export const fanDocuments = [
  {
    label: "7.5K EC Fan Configuration",
    href: "/documents/Garvata AI EC Fan Configuration_7.5K.pdf",
  },
  {
    label: "10K EC Fan Configuration",
    href: "/documents/Garvata AI EC Fan Configuration_10K.pdf",
  },
];
