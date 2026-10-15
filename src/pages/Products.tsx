import PageIntro from "@/components/site/PageIntro";
import ProductRow from "@/components/site/ProductRow";
import { Container, PillLink, SectionHeading } from "@/components/site/ui";
import { CoolingOsMark, ProductImage } from "@/components/site/visuals";
import { fanDocuments, products, type ProductId } from "@/content/catalog";
import { track } from "@/lib/analytics";
import { usePageMeta } from "@/lib/usePageMeta";
import { CheckCircle2, FileDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const fanImages = [
  "/fans/garvata-fan-01.webp",
  "/fans/garvata-fan-02.webp",
  "/fans/garvata-fan-03.webp",
  "/fans/garvata-fan-04.webp",
  "/fans/garvata-fan-05.avif",
  "/fans/garvata-fan-06.webp",
  "/fans/garvata-fan-07.webp",
  "/fans/garvata-fan-08.webp",
  "/fans/garvata-fan-09.webp",
  "/fans/garvata-fan-10.webp",
  "/fans/garvata-fan-11.webp",
  "/fans/garvata-fan-12.webp",
];

const capabilities = [
  {
    title: "High-efficiency motors",
    text: "EC motors that deliver more airflow per watt than AC alternatives.",
    points: [
      "IE5-equivalent efficiency",
      "Aerodynamically optimized impellers",
      "German-engineered components",
    ],
  },
  {
    title: "Built-in monitoring",
    text: "Each fan reports speed, temperature, power draw and vibration — no external sensors needed.",
    points: [
      "Live performance data",
      "Early fault detection",
      "Full diagnostic history",
    ],
  },
  {
    title: "Quick installation",
    text: "Drop-in replacement for existing fans. No rewiring, no controller changes.",
    points: ["Plug-and-play wiring", "Standard mounting sizes", "Retrofit-ready"],
  },
  {
    title: "BMS compatible",
    text: "Connects to your existing building management system over Modbus or BACnet.",
    points: [
      "Modbus and BACnet support",
      "Works with existing BMS",
      "IoT-ready interfaces",
    ],
  },
  {
    title: "Compact form factor",
    text: "Fits in the same footprint as the fan it replaces. No structural changes needed.",
    points: [
      "Same-size replacement",
      "Lightweight build",
      "No structural modifications",
    ],
  },
  {
    title: "Variable speed",
    text: "Fan speed adjusts continuously to match actual demand — no fixed-speed waste.",
    points: [
      "0–100% speed range",
      "Demand-matched output",
      "Cube-law energy savings",
    ],
  },
];

// Copy and actions for each product row, in page order.
const rows: {
  id: ProductId;
  description: string;
  points?: string[];
  actions?: ReactNode;
}[] = [
  {
    id: "cooling-os",
    description:
      "A control layer that sits above your BMS. It forecasts thermal risk with a digital twin, coordinates every cooling unit as one system, and adjusts fans, valves and capacity — with a safety checker validating every change before it reaches equipment.",
    points: [
      "Digital twin anticipates thermal conditions",
      "HVAC agent decides and executes through your BMS",
      "Safety checker validates every setpoint against limits",
    ],
    actions: (
      <PillLink
        to="/solutions/data-centers"
        trackCta={{ cta: "cooling_os", location: "products" }}
      >
        Cooling OS for data centers
      </PillLink>
    ),
  },
  {
    id: "ahu-control",
    description:
      "An industrial edge controller installed with each AHU reads the sensors and commands the fans. Our AI tunes fan speed across every unit for the conditions in the room, and the edge controller keeps control local even if the network goes down.",
    points: [
      "Reads temperature, humidity, pressure and CO₂",
      "Commands EC fans directly over Modbus",
      "Cloud dashboard with alerts and performance history",
    ],
    actions: (
      <>
        <PillLink
          to="/solutions/commercial"
          trackCta={{ cta: "ahu_control", location: "products" }}
        >
          AHU solutions
        </PillLink>
        <PillLink variant="outline" to="/demo">
          Watch the demo
        </PillLink>
      </>
    ),
  },
  {
    id: "ec-fans",
    description:
      "Direct-drive EC fans that deliver more airflow per watt than belt-driven AC motors. Each fan reports its speed, temperature, power draw and vibration, so problems show up before they cause downtime.",
    points: [
      "IE5-equivalent EC motors",
      "Drop-in replacement — no rewiring",
      "Modbus and BACnet ready",
    ],
    actions: (
      <PillLink variant="outline" href="#ec-fan-details">
        Specs and configurations
      </PillLink>
    ),
  },
  {
    id: "ec-motor",
    description:
      "Our own EC motor, engineered in India to bring down cost and lead time for EC fans — today largely dependent on imported components.",
  },
  {
    id: "precision-cooling",
    description:
      "On our roadmap: complete Garvata precision cooling units with EC fan arrays and intelligent controls, built for Cooling OS from the start — including CDUs for liquid cooling.",
  },
];

const Products = () => {
  usePageMeta(
    "Products",
    "Garvata Cooling OS, GarvataAI AHU control with edge controllers, and high-efficiency EC fans — software and hardware for AI native cooling.",
    "/products",
  );

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  const images = isMobile ? fanImages.slice(0, 4) : fanImages;

  return (
    <>
      <PageIntro
        title="Software and hardware,"
        accent="designed together"
        description="The software learns the site. Garvata equipment closes the loop. Because we build both, every fan reports what it's doing and every command is one it was designed to take."
      >
        <nav aria-label="Products" className="flex flex-wrap justify-center gap-2">
          {rows.map(({ id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-[40px] items-center rounded-full border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:border-gray-500 hover:text-gray-900"
            >
              {products[id].name.replace(/^Garvata(AI)? /, "")}
            </a>
          ))}
        </nav>
      </PageIntro>

      <section className="pb-8">
        <Container>
          {rows.map((row) => {
            const product = products[row.id];
            return (
              <ProductRow
                key={row.id}
                id={row.id}
                name={product.name}
                tagline={product.tagline}
                description={row.description}
                points={row.points}
                status={product.status}
                actions={row.actions}
                mediaTone={product.image ? "light" : "dark"}
                media={
                  product.image ? (
                    <ProductImage {...product.image} />
                  ) : (
                    <CoolingOsMark />
                  )
                }
              />
            );
          })}
        </Container>
      </section>

      <section
        id="ec-fan-details"
        className="border-y border-gray-200 bg-gray-50 py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            title="Garvata EC fans,"
            accent="in detail"
            action={
              <div className="flex flex-wrap gap-3">
                {fanDocuments.map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("document_downloaded", { document: doc.label })
                    }
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 hover:border-gray-400"
                  >
                    <FileDown className="h-4 w-4 text-primary" />
                    {doc.label}
                  </a>
                ))}
              </div>
            }
          >
            <p>
              German-engineered EC fans built for commercial HVAC, designed to
              pair with Garvata's autonomous control.
            </p>
          </SectionHeading>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {images.map((src, index) => (
              <div
                key={src}
                className="aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <img
                  src={src}
                  loading="lazy"
                  width={224}
                  height={224}
                  alt={`Garvata EC fan, view ${index + 1}`}
                  className="h-full w-full object-contain p-3"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((card) => (
              <div key={card.title} className="bg-white p-6 lg:p-8">
                <h3 className="mb-2 font-serif text-lg font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {card.text}
                </p>
                <ul className="space-y-1.5">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2
                        className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Products;
