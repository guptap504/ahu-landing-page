import { Container, PillLink, SectionHeading } from "./ui";

const howItWorksSteps = [
  {
    num: "01",
    title: "Connect",
    desc: "EC fans and sensors in each unit connect to a Garvata edge controller.",
  },
  {
    num: "02",
    title: "Run locally",
    desc: "Edge controllers keep running the fans on their own — even if the network goes down.",
  },
  {
    num: "03",
    title: "Optimize",
    desc: "Our AI analyses data across every unit and adjusts fan speed for peak efficiency.",
  },
  {
    num: "04",
    title: "Monitor",
    desc: "A cloud dashboard gives you real-time visibility, alerts and performance history.",
  },
];

export function HowItWorksSteps() {
  return (
    <ol className="grid border-t border-gray-200 md:grid-cols-4">
      {howItWorksSteps.map((step, i) => (
        <li
          key={step.num}
          className={`py-8 md:px-6 md:first:pl-0 ${i < howItWorksSteps.length - 1 ? "border-b border-dashed border-gray-300 md:border-b-0 md:border-r" : ""}`}
        >
          <span className="mb-3 block font-mono text-sm font-bold text-primary">
            {step.num}
          </span>
          <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">{step.desc}</p>
        </li>
      ))}
    </ol>
  );
}

const howItWorksIntro =
  "Each unit gets an edge controller. The controllers talk to our AI. The AI tunes every fan for the conditions in the room — and you watch it all from one dashboard.";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <Container>
        <SectionHeading title="From sensor" accent="to setpoint">
          <p>{howItWorksIntro}</p>
        </SectionHeading>
        <div className="mt-14">
          <HowItWorksSteps />
        </div>
      </Container>
    </section>
  );
}

export function RoiCallout({ location }: { location: string }) {
  return (
    <section className="py-8 sm:py-12">
      <Container>
        <div className="grid items-center gap-8 rounded-[1.75rem] border border-gray-200 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-14">
          <SectionHeading
            title="Estimate your"
            accent="AHU savings"
            layout="stacked"
          >
            <p>
              Enter your AHUs — airflow, run hours, motor rating and VFD
              frequency — and get a per-unit EC fan selection with energy
              savings and payback. Export the results to Excel.
            </p>
          </SectionHeading>
          <div className="lg:justify-self-end">
            <dl className="mb-8 grid grid-cols-3 gap-4 border-y border-gray-200 py-5 text-center">
              {[
                ["Per AHU", "fan selection"],
                ["Payback", "in months"],
                [".xlsx", "export"],
              ].map(([value, label]) => (
                <div key={value} className="flex flex-col">
                  <dt className="order-2 text-xs text-gray-500">{label}</dt>
                  <dd className="order-1 font-mono text-lg font-bold text-gray-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <PillLink
              to="/calculate"
              trackCta={{ cta: "calculate_roi", location }}
            >
              Open the ROI calculator
            </PillLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
