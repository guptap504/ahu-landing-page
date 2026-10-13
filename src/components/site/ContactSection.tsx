import ContactForm from "@/components/ContactForm";
import { openCalendly } from "@/lib/calendly";
import { Container, PillLink, SectionHeading } from "./ui";

type ContactSectionProps = {
  title: string;
  accent: string;
  description: string;
  /** Page name, used to attribute analytics events */
  location: string;
};

export default function ContactSection({
  title,
  accent,
  description,
  location,
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <Container>
        <div className="rounded-[1.75rem] border border-gray-200 bg-gray-50 p-6 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading title={title} accent={accent} layout="stacked">
                <p className="max-w-md">{description}</p>
              </SectionHeading>
              <div className="mt-8 flex flex-wrap gap-3">
                <PillLink
                  onClick={openCalendly}
                  trackCta={{ cta: "schedule_call", location }}
                >
                  Schedule a call
                </PillLink>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h3 className="mb-6 font-serif text-xl font-semibold text-gray-900">
                Send us a message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
