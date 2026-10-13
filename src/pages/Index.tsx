import ContactSection from "@/components/site/ContactSection";
import PageHero from "@/components/site/PageHero";
import { HowItWorks, RoiCallout } from "@/components/site/sections";
import {
  Container,
  PillLink,
  SectionHeading,
  StatGrid,
} from "@/components/site/ui";
import { usePageMeta } from "@/lib/usePageMeta";

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

const Index = () => {
  usePageMeta(
    "Garvata Labs: AI Native Cooling for Data Centers, IT Parks & Pharma",
    "AI native cooling from Garvata Labs. Autonomous control and EC fans that cut cooling energy for data centers, commercial IT parks and pharma manufacturing.",
    "/",
  );

  return (
    <>
      <PageHero
        eyebrow="Garvata Labs"
        title="AI native cooling"
        accent="for data centers, IT parks and pharma."
        description="Cooling that runs itself. Garvata pairs AI that predicts, coordinates and controls with EC fans and controllers built to take its commands — cutting energy without letting conditions drift."
        actions={
          <>
            <PillLink
              href="#contact"
              variant="light"
              trackCta={{ cta: "talk_to_sales", location: "home_hero" }}
            >
              Talk to us
            </PillLink>
            <PillLink
              to="/calculate"
              variant="outline-dark"
              trackCta={{ cta: "calculate_roi", location: "home_hero" }}
            >
              Calculate ROI
            </PillLink>
          </>
        }
        visual={
          <img
            src="/products/ec-fan.webp"
            width={1000}
            height={944}
            alt="Garvata EC plug fan"
            className="mx-auto w-full max-w-[13rem] sm:max-w-sm lg:max-w-lg"
          />
        }
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            title="Cooling that runs itself,"
            accent="engineered by Garvata"
            action={
              <PillLink variant="outline" href="#how-it-works">
                How it works
              </PillLink>
            }
          >
            <p>
              Most cooling still runs on static rules written for the day the
              building opened. Garvata replaces them with a control layer that
              learns your site, predicts thermal load and drives every fan and
              valve to the lowest-energy safe setpoint — on hardware we design
              to work with it.
            </p>
          </SectionHeading>
          <div className="mt-12">
            <StatGrid stats={stats} />
          </div>
        </Container>
      </section>

      <div className="border-t border-gray-200">
        <HowItWorks />
      </div>

      <RoiCallout location="home" />

      <ContactSection
        title="Talk to us about"
        accent="your site"
        description="Tell us what you're cooling — a data hall, an IT park or a production floor — and we'll show you what Garvata would change and what it would save."
        location="home"
      />
    </>
  );
};

export default Index;
