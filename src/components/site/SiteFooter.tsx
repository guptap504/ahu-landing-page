import { fanDocuments } from "@/content/catalog";
import { track } from "@/lib/analytics";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

type FooterLink = { label: string; to?: string; href?: string };

// Brand marks (Simple Icons paths) so both icons share one filled style.
const socialLinks = [
  {
    label: "Garvata Labs on LinkedIn",
    href: "https://www.linkedin.com/company/garvata/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Garvata Labs on X",
    href: "https://x.com/garvataHQ",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Data Centers", to: "/solutions/data-centers" },
      { label: "Commercial IT Parks", to: "/solutions/commercial" },
      { label: "Pharma Manufacturing", to: "/solutions/pharma" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Cooling OS", to: "/products#cooling-os" },
      { label: "AHU Control", to: "/products#ahu-control" },
      { label: "EC Fans", to: "/products#ec-fans" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Product Demo", to: "/demo" },
      { label: "Blog", to: "/blog" },
      ...fanDocuments.map((doc) => ({
        label: `${doc.label} (PDF)`,
        href: doc.href,
      })),
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="p-3 sm:p-4">
      <div className="rounded-[1.75rem] bg-navy px-6 py-12 text-slate-300 sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 text-white">
              <img src="/logo192.svg" alt="" className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">Garvata Labs</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              AI native cooling for data centers, commercial IT parks and pharma
              manufacturing.
            </p>
            <a
              href="mailto:hello@garvata.com"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              hello@garvata.com
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="font-serif text-base font-semibold text-white">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="inline-flex min-h-[36px] items-center text-sm text-slate-400 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("document_downloaded", {
                            document: link.label,
                            location: "footer",
                          })
                        }
                        className="inline-flex min-h-[36px] items-center text-sm text-slate-400 hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 Garvata Labs. All rights reserved.</span>
          <ul className="-mx-3 flex items-center">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full hover:text-white"
                >
                  <svg
                    className="h-[1.125rem] w-[1.125rem]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
