import { contactHref, contextForPath } from "@/content/contact";
import { track } from "@/lib/analytics";
import { ArrowRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// `match` is the path prefix that marks an item as current. Solutions links
// straight to its first tab so navigation doesn't pass through a redirect.
const navItems = [
  { label: "Home", to: "/", match: "/", end: true },
  { label: "Solutions", to: "/solutions/data-centers", match: "/solutions" },
  { label: "Products", to: "/products", match: "/products" },
  { label: "ROI Calculator", to: "/calculate", match: "/calculate" },
  { label: "Demo", to: "/demo", match: "/demo" },
  { label: "Blog", to: "/blog", match: "/blog" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const close = useCallback(() => setIsOpen(false), []);

  // Close the drawer whenever the route changes.
  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    // Visibility flips instantly on open (see className), so this can focus.
    drawerRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const isCurrent = (item: (typeof navItems)[number]) =>
    item.end ? pathname === item.match : pathname.startsWith(item.match);

  // The current item sits in a squircle; browsers without corner-shape
  // support show the same box with ordinary rounded corners.
  const itemShape = "rounded-xl border [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl";
  const currentItem = "border-white/15 bg-white/10 text-white";

  return (
    <>
      <header className="fixed inset-x-5 top-5 z-50 sm:inset-x-8 sm:top-8">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-white/10 bg-navy-800/90 pl-5 pr-2 shadow-lg shadow-navy/20 sm:pl-6"
        >
          <Link
            to="/"
            className="flex min-h-[44px] items-center gap-2.5 text-white"
          >
            <img src="/logo192.svg" alt="" className="h-7 w-7" />
            <span className="font-serif text-lg font-bold">Garvata Labs</span>
          </Link>

          <div className="hidden items-center text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isCurrent(item) ? "page" : undefined}
                className={`${itemShape} px-3.5 py-2 transition-colors ${isCurrent(item) ? currentItem : "border-transparent text-slate-300 hover:text-white"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <Link
              to={contactHref(contextForPath(pathname))}
              onClick={() =>
                track("cta_clicked", { cta: "contact_us", location: "nav" })
              }
              className="hidden min-h-[48px] items-center gap-3 rounded-full bg-cyan-400 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan-300 sm:inline-flex"
            >
              Contact
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white"
                aria-hidden="true"
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full text-slate-200 hover:text-white lg:hidden"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed right-0 top-0 z-[60] h-full w-72 bg-navy p-6 shadow-xl duration-200 ease-out ${isOpen ? "visible translate-x-0 transition-transform" : "invisible translate-x-full transition-[transform,visibility]"}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <span className="font-serif font-bold text-white">Garvata Labs</span>
          <button
            onClick={close}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-slate-300 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              aria-current={isCurrent(item) ? "page" : undefined}
              className={`${itemShape} -mx-3 px-3 py-2.5 ${isCurrent(item) ? currentItem : "border-transparent text-slate-200 hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={contactHref(contextForPath(pathname))}
            onClick={() => {
              track("cta_clicked", { cta: "contact_us", location: "drawer" });
              close();
            }}
            className="mt-4 rounded-full bg-cyan-400 px-5 py-3 text-center font-semibold text-navy"
          >
            Contact us
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[55] bg-black/40" onClick={close} />
      )}
    </>
  );
}
