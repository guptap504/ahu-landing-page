import { track } from "@/lib/analytics";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
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
      {
        label: "Solutions Overview (PDF)",
        href: "/documents/Garvata Solution For AHU and EC fans.pdf",
      },
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
                    {"to" in link && link.to ? (
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
                            document: "Solutions Overview",
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
          <a
            href="https://x.com/garvataHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @garvataHQ
          </a>
        </div>
      </div>
    </footer>
  );
}
