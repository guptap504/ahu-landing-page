import { PillLink } from "@/components/site/ui";
import { CoolingOsPipeline } from "@/components/site/visuals";
import { ArrowRight } from "lucide-react";
import { PanelIntro, PanelProducts, PanelSection } from "./Panel";

const problems = [
  {
    title: "Static rules",
    text: "Cooling is modulated on fixed rules, mostly against return-air temperature — not what servers actually breathe.",
  },
  {
    title: "Reactive control",
    text: "Every adjustment happens after conditions change, so control always lags the real state at the server inlets.",
  },
  {
    title: "One lever at a time",
    text: "Units adjust either the fan or the compressor, never both together.",
  },
  {
    title: "No coordination",
    text: "Neighbouring units work against each other — one humidifying while the next dehumidifies, one reheating air another just cooled.",
  },
];

const pillars = [
  {
    num: "01",
    label: "Predictive",
    title: "Anticipate thermal risk",
    text: "Garvata HVAC AI forecasts hot spots and proposes efficient setpoints before conditions drift.",
  },
  {
    num: "02",
    label: "Coordination",
    title: "Operate the room as one system",
    text: "Coordinates CRAC and CRAH units to cut unit fighting, reheat and airflow imbalance.",
  },
  {
    num: "03",
    label: "Control",
    title: "Closed-loop, multi-parameter control",
    text: "Modulates fans, valves and cooling capacity against rack-inlet conditions — not a single room signal.",
  },
];

const architecture = [
  {
    num: "01",
    name: "DCIM",
    role: "Workload + rack context",
    points: ["Rack locations", "IT and rack load", "Cooling requirement", "Capacity and assets"],
  },
  {
    num: "02",
    name: "Garvata Cooling OS",
    role: "Supervisory control",
    points: [
      "Digital twin of the room",
      "HVAC agent decides setpoints",
      "Safety checker validates limits",
    ],
    highlight: true,
  },
  {
    num: "03",
    name: "BMS",
    role: "Safe local execution",
    points: [
      "Receives control setpoints",
      "Fan, valve and capacity commands",
      "Equipment state and alarms",
      "Local safety and PID loops",
    ],
  },
  {
    num: "04",
    name: "CRAC / CRAH / CDU",
    role: "Precision cooling",
    points: ["Garvata controller", "EC fan array", "Intelligent controls"],
  },
];

const inputs = [
  "Return air temperature",
  "Supply air temperature",
  "Chilled water in / out",
  "Relative humidity",
  "Duct pressure",
  "CO₂",
  "Outside conditions",
  "Rack load from DCIM",
];

const outputs = [
  "CRAC / CRAH setpoints",
  "EC fan RPM",
  "Chilled water valve %",
  "Pump motor RPM",
  "Fresh air damper %",
];

const capabilities = [
  {
    title: "Works with what you run",
    text: "Cooling OS takes context from your DCIM and sends setpoints through your BMS. Nothing is ripped out.",
  },
  {
    title: "Safety first",
    text: "Every proposed change is checked against limits before execution, and your BMS keeps its local safety loops.",
  },
  {
    title: "Software and equipment, one vendor",
    text: "We build the control layer and the fans it commands, so the two are designed to work together.",
  },
  {
    title: "Engineered in India",
    text: "Designed and supported locally, with an Indian EC motor in development to shorten hardware lead times.",
  },
];

export default function DataCentersPanel() {
  return (
    <>
      <PanelIntro
        title="AI native cooling"
        accent="for data centers"
        description="Garvata Cooling OS runs your cooling as one system — predicting thermal risk, coordinating every CRAC and CRAH, and controlling fans, valves and capacity against rack-inlet conditions."
        status="piloting"
        actions={
          <PillLink
            to="/contact?from=data-centers"
            trackCta={{ cta: "early_access", location: "solutions_dc" }}
          >
            Request early access
          </PillLink>
        }
        footnote={
          <p className="text-sm text-gray-500">
            Pilot programme now open to data centers.
          </p>
        }
        visual={
          <div className="rounded-[1.5rem] bg-navy p-4 sm:p-6">
            <CoolingOsPipeline />
          </div>
        }
      />

      <PanelSection
        title="Rule-based cooling"
        accent="can't keep up with AI load"
        description={
          <p>
            As rack densities climb, cooling that was tuned once and left alone
            wastes energy and leaves hot spots unmanaged — costing energy and
            usable compute capacity.
          </p>
        }
      >
        <dl className="grid gap-x-16 border-t border-gray-200 sm:grid-cols-2">
          {problems.map((problem) => (
            <div key={problem.title} className="border-b border-gray-200 py-7">
              <dt className="font-serif text-xl font-semibold text-gray-900">
                {problem.title}
              </dt>
              <dd className="mt-2 leading-relaxed text-gray-600">{problem.text}</dd>
            </div>
          ))}
        </dl>
      </PanelSection>

      <PanelSection
        id="cooling-os"
        title="Cooling OS:"
        accent="predict, coordinate, control"
        description={
          <p>
            Manage a complex cooling plant as one operating layer — improving
            efficiency, reliability and the compute capacity you can safely
            run.
          </p>
        }
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.num}
              className={`rounded-[1.5rem] p-7 lg:p-8 ${i === 0 ? "bg-navy" : "border border-gray-200 bg-white"}`}
            >
              <div className="mb-10 flex items-baseline gap-3">
                <span
                  className={`font-mono text-sm font-bold ${i === 0 ? "text-cyan-300" : "text-primary"}`}
                >
                  {pillar.num}
                </span>
                <span
                  className={`font-mono text-xs font-bold uppercase tracking-[0.18em] ${i === 0 ? "text-slate-400" : "text-gray-500"}`}
                >
                  {pillar.label}
                </span>
              </div>
              <h4
                className={`font-serif text-2xl font-semibold ${i === 0 ? "text-white" : "text-gray-900"}`}
              >
                {pillar.title}
              </h4>
              <p
                className={`mt-3 leading-relaxed ${i === 0 ? "text-slate-300" : "text-gray-600"}`}
              >
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection
        id="architecture"
        title="Where it sits"
        accent="in your data center"
        description={
          <p>
            Cooling OS is a supervisory layer. It doesn't replace your DCIM or
            BMS — it turns their context into coordinated action.
          </p>
        }
      >
        <div className="rounded-[1.5rem] bg-navy p-5 sm:p-8">
          <ol className="grid gap-4 lg:grid-cols-4">
            {architecture.map((layer, i) => (
              <li key={layer.num} className="relative">
                <div
                  className={`h-full rounded-2xl p-6 ${layer.highlight ? "bg-cyan-400 text-navy" : "border border-white/10 bg-navy-800 text-white"}`}
                >
                  <span
                    className={`font-mono text-sm font-bold ${layer.highlight ? "text-navy/70" : "text-cyan-300"}`}
                  >
                    {layer.num}
                  </span>
                  <h4 className="mt-4 font-serif text-xl font-semibold">
                    {layer.name}
                  </h4>
                  <p
                    className={`mt-1 text-sm font-semibold ${layer.highlight ? "text-navy/80" : "text-cyan-300"}`}
                  >
                    {layer.role}
                  </p>
                  <ul
                    className={`mt-5 space-y-2 border-t pt-5 text-sm ${layer.highlight ? "border-navy/15 text-navy/90" : "border-white/10 text-slate-300"}`}
                  >
                    {layer.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                {i < architecture.length - 1 && (
                  <ArrowRight
                    className="absolute -right-3.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-cyan-400 lg:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-white/10 pt-6 text-center font-serif text-lg text-white">
            DCIM supplies context <span className="text-cyan-400">→</span>{" "}
            Cooling OS proposes <span className="text-cyan-400">→</span> BMS
            executes <span className="text-cyan-400">→</span> equipment closes
            the loop.
          </p>
        </div>
      </PanelSection>

      <PanelSection
        title="Reads the whole room,"
        accent="acts on every lever"
        description={
          <p>
            Cooling OS combines sensor data from every unit with rack load from
            DCIM, then manages heat dissipation and minimises energy by heavily
            penalising any deviation from setpoint.
          </p>
        }
      >
        <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8">
            <h4 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
              Signals in
            </h4>
            <ul className="flex flex-wrap gap-2">
              {inputs.map((input) => (
                <li
                  key={input}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm text-gray-700"
                >
                  {input}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-navy px-8 py-6 lg:flex-col">
            <img src="/logo192.svg" alt="" className="h-10 w-10" />
            <span className="ml-3 font-serif font-semibold text-white lg:ml-0 lg:mt-3">
              Cooling OS
            </span>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8">
            <h4 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
              Actions out, via BMS
            </h4>
            <ul className="flex flex-wrap gap-2">
              {outputs.map((output) => (
                <li
                  key={output}
                  className="rounded-full border border-primary/30 bg-primary/[0.04] px-3.5 py-1.5 font-mono text-sm text-primary"
                >
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Key capabilities" accent="of Cooling OS">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-gray-200 bg-white p-7"
            >
              <h4 className="font-serif text-xl font-semibold text-gray-900">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelProducts
        industry="data centers"
        ids={["cooling-os", "ec-fans", "ec-motor", "precision-cooling"]}
      />
    </>
  );
}
