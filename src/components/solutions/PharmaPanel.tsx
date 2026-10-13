import { PillLink } from "@/components/site/ui";
import { PanelIntro, PanelProducts, PanelSection } from "./Panel";

const challenges = [
  {
    title: "Pressure has to hold",
    text: "Labs and clean rooms rely on pressure differentials — negative pressure for containment — that must hold as doors open and filters load.",
  },
  {
    title: "Around-the-clock operation",
    text: "AHUs serving clean rooms and labs rarely stop, which makes fan energy one of the largest loads on site.",
  },
  {
    title: "Changing system resistance",
    text: "As filters load, pressure drop rises. Unless the fans respond, airflow and room pressure drift.",
  },
  {
    title: "Margin costs energy",
    text: "Fixed-speed and rule-based drives run with extra headroom to stay safe — all day, every day.",
  },
];

const approach = [
  {
    num: "01",
    title: "Holds room pressure",
    text: "Supply and exhaust fan speeds respond to room differential-pressure readings, so labs and clean rooms keep the negative or positive pressure they're designed for.",
  },
  {
    num: "02",
    title: "Responds as conditions change",
    text: "Fan speed follows live temperature, humidity and duct pressure instead of a fixed rule table — compensating as filters load.",
  },
  {
    num: "03",
    title: "Stays inside your limits",
    text: "You set the operating bounds for airflow and pressure. The controller only selects fan speeds within them.",
  },
  {
    num: "04",
    title: "Sees problems early",
    text: "Each fan reports motor temperature, vibration and power draw, with automated alerts and a full diagnostic history. Works alongside your BMS over Modbus or BACnet.",
  },
];

export default function PharmaPanel() {
  return (
    <>
      <PanelIntro
        title="AI native cooling"
        accent="for clean rooms and labs"
        description="Pharma clean rooms and labs depend on AHUs that run around the clock and hold strict pressure differentials. Garvata keeps fans responding to real conditions — including room pressure — inside the limits you set, and trims the energy that fixed-speed fans waste."
        status="available"
        actions={
          <PillLink
            href="#contact"
            trackCta={{ cta: "talk_to_sales", location: "solutions_pharma" }}
          >
            Talk to us
          </PillLink>
        }
        visual={
          <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-navy">
            <img
              src="/products/edge-controller.webp"
              width={1000}
              height={750}
              alt="Garvata edge controller"
              className="w-full max-w-md object-contain p-8"
            />
          </div>
        }
      />

      <PanelSection
        title="Always on,"
        accent="always within limits"
        description={
          <p>
            Clean rooms and labs have to hold temperature, humidity and
            pressure without interruption. That's exactly why so much pharma
            HVAC runs harder than it needs to.
          </p>
        }
      >
        <dl className="grid gap-x-12 border-t border-gray-200 md:grid-cols-2">
          {challenges.map((challenge) => (
            <div key={challenge.title} className="border-b border-gray-200 py-7">
              <dt className="font-serif text-xl font-semibold text-gray-900">
                {challenge.title}
              </dt>
              <dd className="mt-2 leading-relaxed text-gray-600">
                {challenge.text}
              </dd>
            </div>
          ))}
        </dl>
      </PanelSection>

      <PanelSection
        id="approach"
        title="Control that respects"
        accent="your operating limits"
      >
        <ol className="grid gap-x-16 border-t border-gray-200 md:grid-cols-2">
          {approach.map((item) => (
            <li
              key={item.num}
              className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-gray-200 py-7"
            >
              <span className="font-mono text-sm font-bold text-primary">
                {item.num}
              </span>
              <div>
                <h4 className="font-serif text-xl font-semibold text-gray-900">
                  {item.title}
                </h4>
                <p className="mt-2 leading-relaxed text-gray-600">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-6 rounded-[1.5rem] bg-navy p-7 sm:p-10 lg:grid-cols-2 lg:gap-16">
          <h4 className="font-serif text-3xl font-semibold leading-tight tracking-tight">
            <span className="block text-white">Built to work with</span>
            <span className="block text-cyan-400">your quality system</span>
          </h4>
          <p className="leading-relaxed text-slate-300 sm:text-lg">
            Garvata only changes what you allow it to change. Before go-live,
            we work with your engineering and QA teams to agree the airflow and
            pressure limits for each clean room, lab and AHU, and any periods
            where setback is permitted.
          </p>
        </div>
      </PanelSection>

      <PanelProducts industry="pharma" ids={["ahu-control", "ec-fans"]} />
    </>
  );
}
