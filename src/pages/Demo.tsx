import ContactSection from "@/components/site/ContactSection";
import { Container, PillLink, SectionHeading } from "@/components/site/ui";
import { usePageMeta } from "@/lib/usePageMeta";

const Demo = () => {
  usePageMeta(
    "Product Demo: Autonomous AHU Control | Garvata Labs",
    "Watch a guided walkthrough of the Garvata platform, then try the live demo of autonomous AHU control.",
    "/demo",
  );

  return (
    <>
      <section id="demo" className="pb-8 pt-28 sm:pb-12 sm:pt-36">
        <Container>
          <div className="rounded-[1.75rem] bg-navy px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <SectionHeading
              as="h1"
              title="See autonomous"
              accent="AHU control in action"
              tone="dark"
              action={
                <PillLink
                  variant="outline-dark"
                  href="https://demo.garvata.com"
                  external
                  trackCta={{ cta: "open_demo", location: "demo" }}
                >
                  Try the live demo
                </PillLink>
              }
            >
              <p>
                Watch a guided walkthrough of the Garvata platform and see how
                operators monitor and optimize AHU performance.
              </p>
            </SectionHeading>
            <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/MYFq11-nYx4?si=EIoPq_NVQbiHpFGv"
                title="Garvata autonomous AHU control product demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </section>

      <ContactSection
        title="Want a walkthrough"
        accent="on your own site?"
        description="We'll show you the platform running on live AHUs and what it would change for your building."
        location="demo"
      />
    </>
  );
};

export default Demo;
