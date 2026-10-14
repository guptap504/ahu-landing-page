import ContactForm from "@/components/ContactForm";
import { openCalendly } from "@/lib/calendly";
import { Container, PillLink, SectionHeading } from "./ui";

type ContactSectionProps = {
  title: string;
  accent: string;
  description: string;
  /** Where the visitor came from; tags analytics events and the enquiry */
  source: string;
};

// Body of the /contact page: intro and call booking beside the message form.
export default function ContactSection({
  title,
  accent,
  description,
  source,
}: ContactSectionProps) {
  return (
    <section id="contact" className="pb-16 pt-28 sm:pb-24 sm:pt-36">
      <Container>
        <div className="rounded-[1.75rem] border border-gray-200 bg-gray-50 p-6 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                as="h1"
                title={title}
                accent={accent}
                layout="stacked"
              >
                <p className="max-w-md">{description}</p>
              </SectionHeading>
              <div className="mt-8 flex flex-wrap gap-3">
                <PillLink
                  onClick={openCalendly}
                  trackCta={{ cta: "schedule_call", location: `contact_${source}` }}
                >
                  Schedule a call
                </PillLink>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-xl font-semibold text-gray-900">
                Send us a message
              </h2>
              <ContactForm source={source} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
