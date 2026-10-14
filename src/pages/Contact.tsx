import ContactSection from "@/components/site/ContactSection";
import {
  contactCopy,
  defaultContactCopy,
  isContactContext,
} from "@/content/contact";
import { usePageMeta } from "@/lib/usePageMeta";
import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [params] = useSearchParams();
  const from = params.get("from");
  const context = isContactContext(from) ? from : undefined;
  const copy = context ? contactCopy[context] : defaultContactCopy;

  usePageMeta(
    "Contact",
    "Talk to Garvata Labs about AI native cooling for your data center, IT park or pharma site. Schedule a call or send us a message.",
    "/contact",
  );

  return <ContactSection {...copy} source={context ?? "direct"} />;
};

export default Contact;
