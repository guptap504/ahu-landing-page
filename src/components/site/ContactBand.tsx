import { contactHref, contextForPath } from "@/content/contact";
import { useLocation } from "react-router-dom";
import { Container, PillLink } from "./ui";

// Rendered by the layout above the footer on every page except /contact,
// linking to the contact page with the current page as context.
export default function ContactBand() {
  const { pathname } = useLocation();
  if (pathname === "/contact") return null;
  const context = contextForPath(pathname);

  return (
    <section aria-label="Contact" className="py-8 sm:py-12">
      <Container>
        <div className="flex flex-col gap-6 rounded-[1.75rem] border border-gray-200 bg-gray-50 p-6 sm:p-10 md:flex-row md:items-center md:justify-between lg:px-14">
          <div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tight">
              <span className="text-gray-900">Have a site in mind? </span>
              <span className="text-primary">Let's talk.</span>
            </h2>
            <p className="mt-2 text-gray-600">
              Schedule a call or send us a message — we'll show you what
              Garvata would change and what it would save.
            </p>
          </div>
          <div className="shrink-0">
            <PillLink
              to={contactHref(context)}
              trackCta={{ cta: "contact_us", location: `band_${context ?? "home"}` }}
            >
              Talk to us
            </PillLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
