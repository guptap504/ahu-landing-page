import { HowItWorksSteps } from "@/components/site/sections";
import { PillLink, StatGrid } from "@/components/site/ui";
import { CheckCircle2, XCircle } from "lucide-react";
import { PanelIntro, PanelProducts, PanelSection } from "./Panel";

const stats = [
  {
    value: "60%",
    label: "Energy savings",
    detail: "Up to 60% lower AHU fan energy versus conventional drives.",
  },
  {
    value: "10%",
    label: "Maintenance savings",
    detail: "Additional savings from fewer breakdowns and planned service.",
  },
  {
    value: "18–20",
    label: "Months to payback",
    detail: "Typical payback for demand-based fan control.",
  },
  {
    value: "24/7",
    label: "Autonomous",
    detail: "Always on, with no manual oversight or tuning.",
  },
];

const valueProps = [
  {
    title: "Optimize costs",
    text: "Demand-based fan control cuts unnecessary runtime instead of running at full power all day.",
  },
  {
    title: "Save energy",
    text: "Responds to temperature and humidity in real time, adjusting fan speed to what the floor needs.",
  },
  {
    title: "Less maintenance",
    text: "Lower fan stress means fewer breakdowns. The system flags issues before they cause downtime.",
  },
];

const comparisonColumns = [
  "Axial Fan + VFD",
  "Plug Fan + VFD",
  "EC Fan Only",
  "EC Fan + GarvataAI",
];

const comparisonRows: {
  label: string;
  values: (string | null)[];
  checks: (boolean | null)[];
}[] = [
  {
    label: "Energy Savings",
    values: ["N/A", "Up to 20%", "Up to 35%", "Up to 60%"],
    checks: [null, null, null, null],
  },
  {
    label: "Preventive Maintenance",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Runs Without Manual Intervention",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Maintenance-based Savings",
    values: [null, null, null, "Up to 10%"],
    checks: [false, false, false, null],
  },
  {
    label: "Demand-controlled Ventilation",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Redundancy (No Single Point of Failure)",
    values: [null, null, null, null],
    checks: [false, true, true, true],
  },
  {
    label: "Motor Temperature Monitoring",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Automated Alerts",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
  {
    label: "Maintenance Ticket Generation",
    values: [null, null, null, null],
    checks: [false, false, false, true],
  },
];

function ComparisonCell({
  value,
  check,
  highlight,
}: {
  value: string | null;
  check: boolean | null;
  highlight: boolean;
}) {
  if (value) {
    return (
      <span
        className={highlight ? "font-mono font-semibold text-primary" : "text-gray-600"}
      >
        {value}
      </span>
    );
  }
  if (check === null) return null;
  const Icon = check ? CheckCircle2 : XCircle;
  return (
    <>
      <Icon
        className={`mx-auto h-[1.125rem] w-[1.125rem] ${check ? "text-emerald-600" : "text-gray-300"}`}
        aria-hidden="true"
      />
      <span className="sr-only">{check ? "Yes" : "No"}</span>
    </>
  );
}

export default function CommercialPanel() {
  return (
    <>
      <PanelIntro
        title="Cut AHU energy costs"
        accent="by up to 60%"
        description="Garvata EC fans and autonomous control retrofit into your existing air handling units — reducing energy spend, preventing breakdowns and running without manual intervention."
        status="available"
        actions={
          <PillLink
            to="/contact?from=commercial"
            trackCta={{ cta: "talk_to_sales", location: "solutions_commercial" }}
          >
            Talk to sales
          </PillLink>
        }
        visual={
          <div className="overflow-hidden rounded-[1.5rem] border border-gray-200">
            <img
              src="/products/ahu.webp"
              width={900}
              height={675}
              alt="Air handling unit installed on a commercial building"
              className="h-full w-full object-cover"
            />
          </div>
        }
      />

      <PanelSection
        title="Lower energy,"
        accent="less maintenance"
        description={
          <p>
            Most AHUs in commercial buildings run belt-driven fans at fixed or
            rule-based speeds. Garvata replaces them with direct-drive EC fans
            and lets the AI decide how fast they need to run.
          </p>
        }
      >
        <StatGrid stats={stats} />
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-12">
          {valueProps.map((prop) => (
            <div key={prop.title}>
              <h4 className="mb-2 font-serif text-lg font-semibold text-gray-900">
                {prop.title}
              </h4>
              <p className="leading-relaxed text-gray-600">{prop.text}</p>
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection
        id="how-it-compares"
        title="How it"
        accent="compares"
        description={
          <p>
            Swapping the fan helps. Swapping the fan and letting it run itself
            is where the savings — and the maintenance benefits — compound.
          </p>
        }
      >
        <p className="mb-2 text-xs text-gray-500 md:hidden">
          Scroll to see all columns &rarr;
        </p>
        <div
          className="relative overflow-x-auto rounded-2xl border border-gray-200 bg-white"
          tabIndex={0}
          role="region"
          aria-label="Comparison table"
        >
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="w-1/4 px-4 py-4 text-left font-serif font-semibold text-gray-900">
                  Feature
                </th>
                {comparisonColumns.map((column, col) => (
                  <th
                    key={column}
                    className={`px-2 py-4 text-center font-serif ${col === 3 ? "border-l-2 border-primary font-bold text-primary" : "font-semibold text-gray-900"}`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.label}</td>
                  {[0, 1, 2, 3].map((col) => (
                    <td
                      key={col}
                      className={`px-2 py-3 text-center ${col === 3 ? "border-l-2 border-primary bg-primary/[0.03]" : ""}`}
                    >
                      <ComparisonCell
                        value={row.values[col]}
                        check={row.checks[col]}
                        highlight={col === 3}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelSection>

      <PanelSection
        id="how-it-works"
        title="From sensor"
        accent="to setpoint"
        description={
          <p>
            Each AHU gets an edge controller. The controllers talk to our AI.
            The AI tunes every fan for the conditions on the floor — and you
            watch it all from one dashboard.
          </p>
        }
      >
        <HowItWorksSteps />
      </PanelSection>

      <PanelProducts industry="IT parks" ids={["ahu-control", "ec-fans"]} />
    </>
  );
}
